import { Achievements } from "../../../../shared/contracts/achievements/entitites/achievement";
import { AchievementType } from "../../../../shared/contracts/achievements/enums/achievementType.enum";

export class AchievementsModel implements Achievements {
  id: string;
  userId: string;
  achievement: AchievementType
}