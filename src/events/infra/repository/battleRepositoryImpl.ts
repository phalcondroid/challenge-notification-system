import { v4 } from "uuid";
import { GameEvents } from "../../../shared/contracts/events/enum/gameEvents.enum";
import { BattleRepository } from "../../../shared/contracts/events/repositories/battle.repository";
import { User } from "../../../shared/contracts/users/entitites/user";
import { DatabaseClient } from "../../../shared/decorators/database";
import { injectable } from "../../../shared/decorators/di";
import { Battle } from "../../domain/entities/battle";
import { Device } from "../../domain/entities/device";
import { UserPreferences } from "../../../shared/contracts/users/enums/userPreferences.enum";
import { UserStatus } from "../../../shared/contracts/users/enums/userStatus.enum";

@injectable()
export class BattleRepositoryImpl implements BattleRepository {

  constructor(private readonly database: DatabaseClient) {}

  /**
   * Saves battles in the persistent system
   * @param Battle battle 
   */
  public saveBattle(battle: Battle): true {
    return this.database.save(battle);
  }

  public getBattleHistoryByUser(userId: string): Battle[] {
    return [
      this.getBattleById(userId),
      this.getBattleById(userId)
    ]
  }
  
  /**
   * 
   * @param battleId 
   * @returns 
   */
  public getBattleById(battleId: string): Battle {
    const userMeta: {
      user: User;
      device: Device;
  } = {
      device: {
        deviceId: "",
        id: v4(),
        platform: "",
        platformVersion: "1"
      },
      user: {
        followers: [],
        history: [],
        id: v4(),
        level: "1",
        mmr: 100,
        name: "Julian",
        preferences: [
          UserPreferences.gameNotifications,
          UserPreferences.socialNotifications
        ],
        rank: 1,
        status: UserStatus.online
      }
    };
    
    return {
      date: new Date,
      players: [ userMeta, userMeta],
      result: GameEvents.lostMatch
    };
  }
}