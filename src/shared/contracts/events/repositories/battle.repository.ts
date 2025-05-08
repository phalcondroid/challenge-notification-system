import { Battle } from "../../../../events/domain/entities/battle";

export interface BattleRepository {
  saveBattle(battle: Battle): true;
  getBattleHistoryByUser(userId: string): Battle[];
  getBattleById(battleId: string): Battle;
}