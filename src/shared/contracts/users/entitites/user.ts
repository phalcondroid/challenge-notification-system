import { UserPreferences } from "../enums/userPreferences.enum";

export interface User {
  id: string;
  name: string;
  level: string;
  preferences: UserPreferences[];
}