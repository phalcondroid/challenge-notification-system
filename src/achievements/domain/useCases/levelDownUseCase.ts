import { v4 } from "uuid";
import { UseCase } from "../../../shared/contracts/domain/useCase";
import { AchievementEvents } from "../../../shared/contracts/events/enum/achievementEvents.enum";
import { EventProvider } from "../../../shared/contracts/events/providers/eventProvider";
import { injectable } from "../../../shared/decorators/di";
import { ChallengeCompletedRequest } from "../contracts/request/challengeCompleteRequest";
import { Achievements } from "../../../shared/contracts/achievements/entitites/achievement";
import { AchievementRepository } from "../../../shared/contracts/achievements/repositories/achievementRepository";
import { AchievementType } from "../../../shared/contracts/achievements/enums/achievementType.enum";

/**
 * Logic business for completed achievements
 */
@injectable()
export class LevelDownUseCase implements UseCase<AchievementType, boolean> {

  constructor(
    private readonly eventHandler: EventProvider,
    private readonly repository: AchievementRepository
  ) {}

  /**
   * Fire achievement completed event
   * @param request 
   * @returns boolean
   */
  public call(request: AchievementType): boolean {
    // const saveResult = this.repository.save(r);
    return true;
  }
}