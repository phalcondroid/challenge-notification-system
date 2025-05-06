import { Locale } from "../enums/locale.enum";

export interface Translation {
  id: string;
  key: string;
  value: string;
  locale: Locale
}