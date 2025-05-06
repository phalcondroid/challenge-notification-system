import { NotificationStatus } from "../enum/notificationStatus.enum";

export interface NotificationProvider {
  send(title: string, body: string, destiny: string): NotificationStatus;
}