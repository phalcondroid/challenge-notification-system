import { NotificationStatus } from "../enum/notificationStatus.enum";

export interface NotificationAdapter {
  connect(): boolean;
  send(title: string, body: string, destiny: string): NotificationStatus;
}