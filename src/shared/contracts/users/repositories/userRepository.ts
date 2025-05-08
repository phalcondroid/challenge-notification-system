import { User } from "../entitites/user";
import { UserPreferences } from "../enums/userPreferences.enum";

export interface UserRepository {
  updateFollowers(id, user: User): boolean;
  updatePreferences(id: string, preferences: UserPreferences): boolean;
  get(id: any): User;
}