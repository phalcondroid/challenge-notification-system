import { Translation } from "../../../shared/contracts/translations/entities/translation";
import { Locale } from "../../../shared/contracts/translations/enums/locale.enum";

export class TranslationModel implements Translation {
  id: string;
  key: string;
  value: string;
  locale: Locale;

  constructor(params: Translation) {
    this.id = params.id;
    this.key = params.key;
    this.value = params.value;
    this.locale = params.locale;
  }
}