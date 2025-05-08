import { User } from "../../../shared/contracts/users/entitites/user";

export interface SocialRequest {
  requesterId: string;
  userDestinyId: User;
}