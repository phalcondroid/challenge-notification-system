import { Translation } from "../entities/translation";
import { Locale } from "../enums/locale.enum";

export interface TranslationManager {
  get(key: any, param?: string, locale?: Locale): Translation;
}