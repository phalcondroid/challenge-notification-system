import { User } from "../../../shared/contracts/users/entitites/user";
import { UserPreferences } from "../../../shared/contracts/users/enums/userPreferences.enum";
import { UserRepository } from "../../../shared/contracts/users/repositories/userRepository";
import { DatabaseClient } from "../../../shared/decorators/database";
import { injectable } from "../../../shared/decorators/di";

@injectable()
export class UserRepositoryImpl implements UserRepository {

  constructor(private readonly database: DatabaseClient) {}

  public updateFollowers(id: any, user: User): boolean {
    return this.database.update({ id }, user);
  }

  /**
   * Update user preferences
   * @param id 
   * @param preferences 
   * @returns 
   */
  public updatePreferences(id: string, preferences: UserPreferences): boolean {
    return this.database.update({ id }, preferences) ?? false;
  }

  /**
   * Get user by id
   * @param id 
   */
  public get(id: string): User {
    return this.database.get(id);
  }
}