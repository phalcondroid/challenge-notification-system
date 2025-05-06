import { NotificationStatus } from "../enum/notificationStatus.enum";

export interface NotificationReport {
  notificationId: string;
  status: NotificationStatus
}