import { v4 } from "uuid";
import { Notification } from "../../../shared/contracts/notifications/entities/notification";
import { NotificationType } from "../../../shared/contracts/notifications/enum/notificationType.enum";
import { Locale } from "../../../shared/contracts/translations/enums/locale.enum";

export class NotificationModel implements Notification {
  id: string;
  type: NotificationType;
  rule: number;
  title: string;
  body: string;
  locale: Locale;
  createdAt: Date;

  constructor(param: Omit<Notification, "id">) {
    this.id = v4();
    this.type = param.type;
    this.rule = param.rule;
    this.title = param.title;
    this.body = param.body;
    this.locale = param.locale;
    this.createdAt = param.createdAt;
  }
  userId: string;
}