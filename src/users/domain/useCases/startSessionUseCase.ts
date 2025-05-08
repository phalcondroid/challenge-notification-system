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
    private readonly userRepo: UserRepository
  ) {}
  
  public call(request: StartSessionRequest) {
    const user = this.userRepo.get({ username: request.username, pass: request.password});
    // register the user sesion in the historyu
    return {
      token: v4(),
      user
    };
  }
}