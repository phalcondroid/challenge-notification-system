import { Battle } from "../entities/battle";
import { User } from "../../../shared/contracts/users/entitites/user";
import { GameEvents } from "../../../shared/contracts/events/enum/gameEvents.enum";

export class LevelUpRule {
  rule: GameEvents.levelUp;
}