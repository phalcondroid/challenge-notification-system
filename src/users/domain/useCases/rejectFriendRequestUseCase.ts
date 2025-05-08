import { v4 } from "uuid";
import { UseCase } from "../../../shared/contracts/domain/useCase";
import { SocialEvents } from "../../../shared/contracts/events/enum/socialEvents.enum";
import { EventProvider } from "../../../shared/contracts/events/providers/eventProvider";
import { Notification } from "../../../shared/contracts/notifications/entities/notification";
import { NotificationStatus } from "../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { TranslationManager } from "../../../shared/contracts/translations/facade/translationManager";
import { User } from "../../../shared/contracts/users/entitites/user";
import { UserPreferences } from "../../../shared/contracts/users/enums/userPreferences.enum";
import { UserRepository } from "../../../shared/contracts/users/repositories/userRepository";
import { injectable } from "../../../shared/decorators/di";
import { SocialRequest } from "../request/socialRequest";
import { NotificationType } from "../../../shared/contracts/notifications/enum/notificationType.enum";
import { Locale } from "../../../shared/contracts/translations/enums/locale.enum";
import { UserStatus } from "../../../shared/contracts/users/enums/userStatus.enum";

@injectable()
export class RejectFriendRequestUseCase implements UseCase<SocialRequest, boolean> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly notifications: UseCase<Notification, NotificationStatus>,
    private readonly eventHandler: EventProvider,
    private readonly translations: TranslationManager
  ) {}
  
  call(request: SocialRequest): boolean {
    const currentUser = this.userRepo.get(request.userDestinyId.id);
    const newRequest = this.userRepo.get(request.requesterId);
    const isNotifiable = currentUser.preferences.filter(
      prefs => prefs === UserPreferences.socialNotifications);
    if (isNotifiable) { return; }
    // send notification if user is notifiable
    this.eventHandler.fire<User>(
      `rejectFriendRequest`,
      newRequest,
      (payload: User) => {
        const title = this.translations.get(SocialEvents.friendRequestRejected, payload.name);
        const body = this.translations.get(SocialEvents.friendRequestRejected, newRequest.name);
        const notification = {
          id: v4(),
          userId: payload.id,
          title: title.value,
          body: body.value,
          type: NotificationType.push,
          rule: SocialEvents.friendRequest,
          createdAt: new Date(),
          locale: Locale.en
        };
        if (newRequest.status === UserStatus.offline) {
          this.notifications.call(notification);
          return;
        }
        notification.type = NotificationType.ingame;
        this.notifications.call(notification);
      });
  }
}