import { AchievementType } from "../enums/achievementType.enum";

export interface Achievements {
  id: string;
  userId: string;
  achievement: AchievementType
}