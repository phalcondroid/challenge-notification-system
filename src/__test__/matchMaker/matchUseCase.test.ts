import { ChallengeCompletedUseCase } from "../../achievements/domain/useCases/challengedCompleteUseCase";
import { LevelDownUseCase } from "../../achievements/domain/useCases/levelDownUseCase";
import { LevelUpUseCase } from "../../achievements/domain/useCases/levelUpUseCase";
import { MatchUseCase } from "../../events/domain/useCases/matchUseCase";
import { UseCase } from "../../shared/contracts/domain/useCase";
import { EventProvider } from "../../shared/contracts/events/providers/eventProvider";
import { Notification } from "../../shared/contracts/notifications/entities/notification";
import { NotificationStatus } from "../../shared/contracts/notifications/enum/notificationStatus.enum";
import { TranslationManager } from "../../shared/contracts/translations/facade/translationManager";

describe("MatchUseCase", () => {
  let eventProviderMock: jest.Mocked<EventProvider>;
  let notificationsMock: jest.Mocked<UseCase<Notification, NotificationStatus>>;
  let translationManagerMock: jest.Mocked<TranslationManager>;
  let levelDownUseCase: jest.Mocked<LevelDownUseCase>;
  let levelUpUseCase: jest.Mocked<LevelUpUseCase>;
  let challengedUseCase: jest.Mocked<ChallengeCompletedUseCase>;
  let useCase: MatchUseCase;

  beforeEach(() => {
    // Given (Arrange)
    eventProviderMock = {
      connection: jest.fn(),
      subscribe: jest.fn(),
      fire: jest.fn()
    } as any;

    notificationsMock = {
      call: jest.fn()
    } as any;

    translationManagerMock = {
      translate: jest.fn()
    } as any;

    useCase = new MatchUseCase(
      eventProviderMock, 
      notificationsMock, 
      translationManagerMock,
      levelUpUseCase,
      levelDownUseCase,
      challengedUseCase
    );
  });

  it("should connect to event stream and subscribe to events", () => {
    // When (Act)
    const result = useCase.call({});
    // Then (Assert)
    expect(eventProviderMock.connection).toHaveBeenCalledWith("Server Socket Connection Gateway");
    expect(eventProviderMock.subscribe).toHaveBeenCalledWith(
      "battleFinder",
      expect.any(Function)
    );
    expect(eventProviderMock.subscribe).toHaveBeenCalledWith(
      "battleStarts",
      expect.any(Function)
    );
    expect(result).toBe(true);
  });
});
