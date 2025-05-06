import { Translation } from "../shared/contracts/translations/entities/translation";
import { Locale } from "../shared/contracts/translations/enums/locale.enum";
import { TranslationManager } from "../shared/contracts/translations/facade/translationManager";
import { GetKeyUseCase } from "./domain/useCases/getKeyUseCase";

/**
 * This class works as facade and is the only one functional worker interface to interact between components.
 */
export class TranslationManagerImpl implements TranslationManager {

  /**
   * Injected by dependency injector.
   * @param GetKeyUseCase getKeyUseCase 
   */
  constructor(private readonly getKeyUseCase: GetKeyUseCase) {}

  /**
   * Facade to get any text by key translated by localization.
   * @param string key 
   * @param string param 
   * @param Locale locale 
   * @returns Translation
   */
  public get(key: string, param: string, locale: Locale = Locale.en): Translation {
    return this.getKeyUseCase.call({ key, param, locale });
  }
}