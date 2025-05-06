import { v4 } from "uuid";
import { NotificationModel } from "../../../notifications/domain/models/notification.model";
import { Achievements } from "../../../shared/contracts/achievements/entitites/achievement";
import { AchievementType } from "../../../shared/contracts/achievements/enums/achievementType.enum";
import { UseCase } from "../../../shared/contracts/domain/useCase";
import { AchievementEvents } from "../../../shared/contracts/events/enum/achievementEvents.enum";
import { EventProvider } from "../../../shared/contracts/events/providers/eventProvider";
import { Notification } from "../../../shared/contracts/notifications/entities/notification";
import { NotificationStatus } from "../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { TranslationManager } from "../../../shared/contracts/translations/facade/translationManager";
import { UserRepository } from "../../../shared/contracts/users/repositories/userRepository";
import { injectable } from "../../../shared/decorators/di";
import { StartSessionRequest } from "../request/startSessionRequest";
import { TokenResponse } from "../response/tokenResponse";
import { NotificationType } from "../../../shared/contracts/notifications/enum/notificationType.enum";
import { Locale } from "../../../shared/contracts/translations/enums/locale.enum";
import { SocialEvents } from "../../../shared/contracts/events/enum/socialEvents.enum";
import { User } from "../../../shared/contracts/users/entitites/user";
import { GameEvents } from "../../../shared/contracts/events/enum/gameEvents.enum";

@injectable()
export class StartSessionUseCase implements UseCase<StartSessionRequest, TokenResponse> {

  constructor(
    private readonly userRepo: UserRepository,
    private readonly notifications: UseCase<Notification, NotificationStatus>,
    private readonly eventHandler: EventProvider,
    private readonly translations: TranslationManager
  ) {}
  
  public call(request: StartSessionRequest) {
    const user = this.userRepo.get({ username: request.username, pass: request.password});

    /**
     * Subscribe to achivements
     */
    this.eventHandler.subscribe<Achievements>(
      `${AchievementEvents.challengeCompleted}${user.id}`, 
      (payload: Achievements) => {
        // Translation for notification content
        const title = this.translations.get(payload.achievement);
        const body = this.translations.get(payload.id);
        this.notifications.call({
          id: v4(),
          userId: user.id,
          title: title.value,
          body: body.value,
          type: NotificationType.push,
          rule: payload.achievement,
          createdAt: new Date(),
          locale: Locale.en
        });
      });

    /**
     * Subscribe to Social friend request
     */
    this.eventHandler.subscribe<User>(
      `${SocialEvents.friendRequest}${user.id}`, 
      (payload: User) => {
        // Translation for notification content
        const title = this.translations.get(SocialEvents.friendRequest, payload.name);
        const body = this.translations.get(SocialEvents.friendRequest);
        this.notifications.call({
          id: v4(),
          userId: payload.id,
          title: title.value,
          body: body.value,
          type: NotificationType.push,
          rule: SocialEvents.friendRequest,
          createdAt: new Date(),
          locale: Locale.en
        });
      });
    
    /**
     * Subscribe to Game event level up
     */
    this.eventHandler.subscribe<User>(
      `${GameEvents.levelUp}${user.id}`,
      (payload: User) => {
        // Translation for notification content
        const title = this.translations.get(GameEvents.levelUp, payload.level);
        const body = this.translations.get(GameEvents.levelUp, payload.level);
        this.notifications.call({
          id: v4(),
          userId: payload.id,
          title: title.value,
          body: body.value,
          type: NotificationType.push,
          rule: GameEvents.levelUp,
          createdAt: new Date(),
          locale: Locale.en
        });
      });

    return {
      token: v4(),
      user
    };
  }
}