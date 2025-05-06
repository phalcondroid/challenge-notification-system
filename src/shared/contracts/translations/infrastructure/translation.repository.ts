import { Translation } from "../entities/translation";
import { Locale } from "../enums/locale.enum";

export interface TranslationRepository {
  getByKey(key: string, param: string, locale: Locale): Translation;
}