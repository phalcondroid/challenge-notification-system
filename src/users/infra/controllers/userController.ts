import { injectable } from "../../../shared/decorators/di";
import { post, put } from "../../../shared/decorators/http";
import { SocialRequest } from "../../domain/request/socialRequest";
import { StartSessionRequest } from "../../domain/request/startSessionRequest";
import { UserPreferencesRequest } from "../../domain/request/userPreferencesRequest";
import { AcceptFriendRequestUseCase } from "../../domain/useCases/acceptFriendRequestUseCase";
import { StartSessionUseCase } from "../../domain/useCases/startSessionUseCase";
import { UpdatePreferencesUseCase } from "../../domain/useCases/updatePreferncesUseCase";

@injectable()
export class UserController {
  constructor(
    private readonly startSesionUseCase: StartSessionUseCase,
    private readonly updatePreferencesUseCase: UpdatePreferencesUseCase,
    private readonly acceptFriendUseCase: AcceptFriendRequestUseCase,
    private readonly rejectFriendUseCase: UpdatePreferencesUseCase,
  ) {}

  /**
   * Update for preferences
   */
  @put()
  public updatePreferences(preferences: UserPreferencesRequest): boolean {
    return this.updatePreferencesUseCase.call(preferences);
  }

  /**
   * 
   * @param start
   * @returns 
   */
  @post()
  public startSession(start: StartSessionRequest) {
    return this.startSesionUseCase.call(start);
  }

  /**
   * 
   * @param start
   * @returns 
   */
  @post()
  public acceptFriendRequest(request: SocialRequest) {
    return this.acceptFriendUseCase.call(request);
  }

  /**
   * 
   * @param start
   * @returns 
   */
  @post()
  public rejectFriendRequest(request: SocialRequest) {
    return this.rejectFriendUseCase.call(request);
  }
}