import { ChallengeCompletedRequest } from "../../achievements/domain/contracts/request/challengeCompleteRequest";
import { ChallengeCompletedUseCase } from "../../achievements/domain/useCases/challengedCompleteUseCase";
import { AchievementType } from "../../shared/contracts/achievements/enums/achievementType.enum";
import { AchievementRepository } from "../../shared/contracts/achievements/repositories/achievementRepository";
import { AchievementEvents } from "../../shared/contracts/events/enum/achievementEvents.enum";
import { EventProvider } from "../../shared/contracts/events/providers/eventProvider";

describe("ChallengeCompletedUseCase", () => {
  let eventProvider: jest.Mocked<EventProvider>;
  let repository: jest.Mocked<AchievementRepository>;
  let useCase: ChallengeCompletedUseCase;

  beforeEach(() => {
    // Given
    eventProvider = { send: jest.fn() } as any;
    repository = { save: jest.fn().mockReturnValue(true) } as any;
    useCase = new ChallengeCompletedUseCase(eventProvider, repository);
  });

  it("should save achievement and emit challengeCompleted event", () => {
    // Given
    const request: ChallengeCompletedRequest = {
      userId: "user-123",
      achievement: AchievementType.basicReward
    };

    // When
    const result = useCase.call(request);

    // Then
    expect(repository.save).toHaveBeenCalled();
    expect(eventProvider.send).toHaveBeenCalledWith(
      AchievementEvents.challengeCompleted,
      expect.objectContaining({ userId: "user-123" })
    );
    expect(result).toBe(true);
  });

  it("should throw error if repository.save fails", () => {
    // Given
    repository.save.mockReturnValue(false);
    const request: ChallengeCompletedRequest = { userId: "user-123", achievement: AchievementType.primeReward };

    // When / Then
    expect(() => useCase.call(request)).toThrow("Achievements persisting error!");
  });
});
