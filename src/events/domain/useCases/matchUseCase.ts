import { v4 } from "uuid";
import { Achievements } from "../../../shared/contracts/achievements/entitites/achievement";
import { UseCase } from "../../../shared/contracts/domain/useCase";
import { AchievementEvents } from "../../../shared/contracts/events/enum/achievementEvents.enum";
import { GameEvents } from "../../../shared/contracts/events/enum/gameEvents.enum";
import { EventProvider } from "../../../shared/contracts/events/providers/eventProvider";
import { Notification } from "../../../shared/contracts/notifications/entities/notification";
import { NotificationStatus } from "../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { TranslationManager } from "../../../shared/contracts/translations/facade/translationManager";
import { User } from "../../../shared/contracts/users/entitites/user";
import { Battle } from "../entities/battle";
import { NotificationType } from "../../../shared/contracts/notifications/enum/notificationType.enum";
import { Locale } from "../../../shared/contracts/translations/enums/locale.enum";
import { LevelUpUseCase } from "../../../achievements/domain/useCases/levelUpUseCase";
import { AchievementType } from "../../../shared/contracts/achievements/enums/achievementType.enum";
import { ChallengeCompletedUseCase } from "../../../achievements/domain/useCases/challengedCompleteUseCase";
import { LevelDownUseCase } from "../../../achievements/domain/useCases/levelDownUseCase";

/**
 * Logic business when game match players
 */
export class MatchUseCase implements UseCase<any, boolean> {
  constructor(
    private readonly eventHandler: EventProvider,
    private readonly notifications: UseCase<Notification, NotificationStatus>,
    private readonly translations: TranslationManager,
    private readonly levelUpUseCase: LevelUpUseCase,
    private readonly levelDownUseCase: LevelDownUseCase,
    private readonly challengeUseCase: ChallengeCompletedUseCase,
  ) {}

  public call(request: any): boolean {
    // event handler for example: kafka or rabbit
    this.eventHandler.connection("Server Socket Connection Gateway");

    // when match maker start to find a battle
    this.eventHandler.subscribe("battleFinder", (canditate: User) => {
      this.eventHandler.fire("battleStarts", canditate, (response) => {});
    });

    // when battle is found
    this.eventHandler.subscribe("battleStarts", (response) => ({
      battleStart: (countender: User, localPlayer: User) => {
        // logic to match players through, sockets or udp protocol
      }
    }));

    /// data transmision in the battle
    this.eventHandler.subscribe("battleTransactionLog", (response) => ({
      registerLog: (results) => {
        // logic to shared commands in bytes... movements, events, actions, results
        // when user is connected with game server
        // protocol UDP.
        this.eventHandler.fire("battleFinish", results, (response) => {});
      }
    }));

    this.eventHandler.subscribe("battleFinish", (response) => ({
      response: (battle: Battle) => {
        switch (battle.result) {
          case GameEvents.passTurorial:
            this.levelUpUseCase.call(AchievementType.passSuccessfullyTutorial);
            break;
          case GameEvents.drawMatch:
          case GameEvents.levelDown:
          case GameEvents.lostMatch:
            this.levelDownUseCase.call(AchievementType.basicReward);
            const title = this.translations.get(
              "WIN_BATTLE_TO_GET_REWARDS_TITLE", battle.result.toString(), Locale.en);
            const body = this.translations.get(
              "WIN_BATTLE_TO_GET_REWARDS", battle.result.toString(), Locale.en);
            this.notifications.call({
              id: v4(),
              userId: battle.players.at(0).user.id,
              title: title.value,
              body: body.value,
              type: NotificationType.push,
              rule: GameEvents.levelDown,
              createdAt: new Date(),
              locale: Locale.en
            });
            break;
          case GameEvents.winMatch:
          case GameEvents.levelUp:
            this.levelUpUseCase.call(AchievementType.primeReward);
            this.notifications.call({
              id: v4(),
              userId: battle.players.at(0).user.id,
              title: this.translations.get("CHALLENGED_COMPLETE_TITLE", battle.result.toString(), Locale.en).value,
              body: this.translations.get("CHALLENGED_COMPLETE", battle.result.toString(), Locale.en).value,
              type: NotificationType.push,
              rule: GameEvents.levelUp,
              createdAt: new Date(),
              locale: Locale.en
            });
            break;
        }
      }
    }));

    /**
     * Subscribe to achivements
     */
    this.eventHandler.subscribe<Achievements>(
      `challengeCompleted`, 
      (payload: Achievements) => {
        // this.challengeUseCase.call();
      });

    return true;
  }
}