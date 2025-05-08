import { Locale } from "../../shared/contracts/translations/enums/locale.enum";
import { TranslationRepository } from "../../shared/contracts/translations/infrastructure/translation.repository";
import { GetKeyUseCase } from "../../translations/domain/useCases/getKeyUseCase";

describe("GetKeyUseCase", () => {
  let repo: jest.Mocked<TranslationRepository>;
  let useCase: GetKeyUseCase;

  beforeEach(() => {
    // Given
    repo = { getByKey: jest.fn() } as any;
    useCase = new GetKeyUseCase(repo);
  });

  it("should get the translated key from repository", () => {
    // Given
    const translation = { value: "Hola" };
    repo.getByKey.mockReturnValue({
      id: "translation-id-123",
      key: "greeting",
      value: "Hello",
      locale: Locale.en
    });

    // When
    const result = useCase.call({ key: "hello", locale: Locale.en, param: "param" });

    // Then
    expect(repo.getByKey).toHaveBeenCalledWith("hello", "param", "es");
    expect(result).toBe(translation);
  });
});
