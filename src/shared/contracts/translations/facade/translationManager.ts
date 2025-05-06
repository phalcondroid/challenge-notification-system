import { Translation } from "../entities/translation";
import { Locale } from "../enums/locale.enum";

export interface TranslationManager {
  get(key: string, param: string, locale: Locale): Translation;
}