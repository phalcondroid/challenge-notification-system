import { injectable } from "../../../shared/decorators/di";
import { post, put } from "../../../shared/decorators/http";
import { StartSessionRequest } from "../../domain/request/startSessionRequest";
import { UserPreferencesRequest } from "../../domain/request/userPreferencesRequest";
import { StartSessionUseCase } from "../../domain/useCases/startSessionUseCase";
import { UpdatePreferencesUseCase } from "../../domain/useCases/updatePreferncesUseCase";

@injectable()
export class UserController {
  constructor(
    private readonly startSesionUseCase: StartSessionUseCase,
    private readonly updatePreferences: UpdatePreferencesUseCase
  ) {}

  /**
   * Update for preferences
   */
  @put()
  public update(preferences: UserPreferencesRequest): boolean {
    return this.updatePreferences.call(preferences);
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
}