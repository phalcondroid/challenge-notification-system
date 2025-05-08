import { GameEvents } from "../../../shared/contracts/events/enum/gameEvents.enum";
import { User } from "../../../shared/contracts/users/entitites/user";
import { Device } from "./device";

export interface Battle {
  players: { user: User, device: Device }[],
  result: GameEvents,
  date: Date,
}