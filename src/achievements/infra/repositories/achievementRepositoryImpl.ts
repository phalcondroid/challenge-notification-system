import { Achievements } from "../../../shared/contracts/achievements/entitites/achievement";
import { AchievementRepository } from "../../../shared/contracts/achievements/repositories/achievementRepository";
import { DatabaseClient } from "../../../shared/decorators/database";
import { injectable } from "../../../shared/decorators/di";

@injectable()
export class AchievementRepositoryImpl implements AchievementRepository {

  constructor(private readonly databaseClient: DatabaseClient) {}

  /**
   * Save achievement in the database
   * @param Achievements data 
   * @returns boolean
   */
  public save(data: Achievements): boolean {
    return this.databaseClient.save(data);
  }
}