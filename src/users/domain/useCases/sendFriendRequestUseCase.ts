import { v4 } from "uuid";
import { UseCase } from "../../../shared/contracts/domain/useCase";
import { SocialEvents } from "../../../shared/contracts/events/enum/socialEvents.enum";
import { EventProvider } from "../../../shared/contracts/events/providers/eventProvider";
import { NotificationStatus } from "../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { NotificationType } from "../../../shared/contracts/notifications/enum/notificationType.enum";
import { TranslationManager } from "../../../shared/contracts/translations/facade/translationManager";
import { User } from "../../../shared/contracts/users/entitites/user";
import { UserPreferences } from "../../../shared/contracts/users/enums/userPreferences.enum";
import { UserRepository } from "../../../shared/contracts/users/repositories/userRepository";
import { injectable } from "../../../shared/decorators/di";
import { SocialRequest } from "../request/socialRequest";
import { Locale } from "../../../shared/contracts/translations/enums/locale.enum";
import { Notification } from "../../../shared/contracts/notifications/entities/notification";
import { UserStatus } from "../../../shared/contracts/users/enums/userStatus.enum";

@injectable()
export class SendFriendRequestUseCase implements UseCase<SocialRequest, boolean> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly notifications: UseCase<Notification, NotificationStatus>,
    private readonly eventHandler: EventProvider,
    private readonly translations: TranslationManager
  ) {}

  public call(request: SocialRequest): boolean {
    const currentUser = this.userRepo.get(request.userDestinyId.id);
    const newRequest = this.userRepo.get(request.requesterId);
    const isNotifiable = currentUser.preferences.filter(
      prefs => prefs === UserPreferences.socialNotifications);
    if (isNotifiable) { return; }
    // send notification if user is notifiable
    this.eventHandler.subscribe<User>(
      `friendRequest`,
      (payload: User) => {
        // newRequest update friend request relation
        // Translation for notification content
        const title = this.translations.get(SocialEvents.friendRequest, payload.name);
        const body = this.translations.get(SocialEvents.friendRequest);
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