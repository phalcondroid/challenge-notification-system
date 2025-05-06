import { Locale } from "../../../shared/contracts/translations/enums/locale.enum";

export interface TranslationRequest {
  key: string;
  param: string;
  locale: Locale;
}