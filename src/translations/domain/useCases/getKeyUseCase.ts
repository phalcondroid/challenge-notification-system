import { Translation } from "../../../shared/contracts/translations/entities/translation";
import { TranslationRepository } from "../../../shared/contracts/translations/infrastructure/translation.repository";
import { UseCase } from "../../../shared/contracts/utils/useCase";
import { TranslationRequest } from "../contracts/translationRequest";

/**
 * The use case for translations business logic.
 */
export class GetKeyUseCase implements UseCase<TranslationRequest, Translation> {

  constructor(private readonly repo: TranslationRepository) {}

  /**
   * Business logic to get translated 
   * @param TranslationRequest params
   * @returns Translation
   */
  public call(params: TranslationRequest): Translation {
    // we can filter locales with geo location... 
    // or any business logic to change the language, or just the user preferences
    const locale = params.locale;
    return this.repo.getByKey(params.key, params.param, locale);
  }
}