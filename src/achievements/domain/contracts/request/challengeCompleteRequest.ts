import { AchievementType } from "../../../../shared/contracts/achievements/enums/achievementType.enum";

export interface ChallengeCompletedRequest {
  userId: string;
  achievement: AchievementType
}