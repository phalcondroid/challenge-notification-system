import { Rule } from "../../enums/rules.enum";
import { Locale } from "../../translations/enums/locale.enum";
import { NotificationType } from "../enum/notificationType.enum";

export interface Notification {
  id: string; //uuid
  type: NotificationType;
  rule: Rule;
  title: string;
  body: string;
  locale: Locale;
  createdAt: Date;
}