import { v4 } from "uuid";
import { UseCase } from "../../../shared/contracts/domain/useCase";
import { AchievementEvents } from "../../../shared/contracts/events/enum/achievementEvents.enum";
import { EventProvider } from "../../../shared/contracts/events/providers/eventProvider";
import { injectable } from "../../../shared/decorators/di";
import { ChallengeCompletedRequest } from "../contracts/request/challengeCompleteRequest";
import { Achievements } from "../../../shared/contracts/achievements/entitites/achievement";
import { AchievementRepository } from "../../../shared/contracts/achievements/repositories/achievementRepository";

/**
 * Logic business for completed achievements
 */
@injectable()
export class ChallengeCompletedUseCase implements UseCase<ChallengeCompletedRequest, boolean> {

  constructor(
    private readonly eventHandler: EventProvider,
    private readonly repository: AchievementRepository
  ) {}

  /**
   * Fire achievement completed event
   * @param request 
   * @returns boolean
   */
  public call(request: ChallengeCompletedRequest): boolean {
    const achievement: Achievements = {
      achievement: request.achievement,
      id: v4(),
      userId: request.userId
    };
    const saveResult = this.repository.save(achievement);
    if (!saveResult) {
      throw new Error("Achievements persisting error!");
    }
    return this.eventHandler.send<Achievements>(AchievementEvents.challengeCompleted, achievement)
  }
}