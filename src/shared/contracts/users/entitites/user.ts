import { UserPreferences } from "../enums/userPreferences.enum";
import { UserStatus } from "../enums/userStatus.enum";

export interface User {
  id: string;
  name: string;
  level: string;
  preferences: UserPreferences[];
  status: UserStatus,
  followers: User[]
  mmr: number;
  rank: number;
  history: any
}