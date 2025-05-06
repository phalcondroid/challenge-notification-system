import { User } from "../entitites/user";
import { UserPreferences } from "../enums/userPreferences.enum";

export interface UserRepository {
  updatePreferences(id: string, preferences: UserPreferences): boolean;
  get(id: any): User;
}