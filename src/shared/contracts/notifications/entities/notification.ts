import { Locale } from "../../translations/enums/locale.enum";
import { NotificationType } from "../enum/notificationType.enum";

export interface Notification {
  id: string; //uuid
  userId: string;
  type: NotificationType;
  rule: number;
  title: string;
  body: string;
  locale: Locale;
  createdAt: Date;
}