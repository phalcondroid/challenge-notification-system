import { UseCase } from "../../../shared/contracts/domain/useCase";
import { Battle } from "../entities/battle";

export class BattleFinisherUseCase implements UseCase<Battle, boolean> {

  constructor() {
    
  }

  public call(request: Battle): boolean {
    return true;
  }
}