import { UserPreferences } from "../../../shared/contracts/users/enums/userPreferences.enum";

export interface UserPreferencesRequest {
  preferences: UserPreferences[];
}