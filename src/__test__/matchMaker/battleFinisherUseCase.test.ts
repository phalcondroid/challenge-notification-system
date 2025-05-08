import { Battle } from "../../events/domain/entities/battle";
import { BattleFinisherUseCase } from "../../events/domain/useCases/battleFinisherUseCase";

describe("BattleFinisherUseCase", () => {
  let useCase: BattleFinisherUseCase;

  beforeEach(() => {
    // Given (Arrange)
    useCase = new BattleFinisherUseCase();
  });

  it("should return true when a battle is passed to call", () => {
    // Given (Arrange)
    const mockBattle: Battle = {} as Battle;

    // When (Act)
    const result = useCase.call(mockBattle);

    // Then (Assert)
    expect(result).toBe(true);
  });
});