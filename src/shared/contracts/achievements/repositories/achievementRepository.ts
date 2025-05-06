import { Achievements } from "../entitites/achievement";

export interface AchievementRepository {
  save(achievement: Achievements): boolean;
}