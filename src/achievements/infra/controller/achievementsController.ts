import { injectable } from "../../../shared/decorators/di";
import { post } from "../../../shared/decorators/http";
import { ChallengeCompletedRequest } from "../../domain/contracts/request/challengeCompleteRequest";
import { ChallengeCompletedUseCase } from "../../domain/useCases/challengedCompleteUseCase";

@injectable()
export class AchievementsController {

  constructor(
    private readonly challengedCompleteUseCase: ChallengeCompletedUseCase
  ) {}

  /**
   * Receive http payload for achievements update 
   * @param request 
   * @returns 
   */
  @post()
  public challengeCompleted(request: ChallengeCompletedRequest): boolean {
    return this.challengedCompleteUseCase.call(request);
  }
}