import { NotificationAdapter } from "../../../../shared/contracts/notifications/adapters/notificationAdapter";
import { NotificationStatus } from "../../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { NotificationProvider } from "../../../../shared/contracts/notifications/providers/notificationProvider";

export class MailerProvider implements NotificationProvider {
  constructor(private readonly mailerAdapter: NotificationAdapter) {}

  /**
   * Method for push notifications
   * @param title 
   * @param body 
   * @param destiny 
   * @returns 
   */
  public send(title: string, body: string, destiny: string): NotificationStatus {
    return this.mailerAdapter.send(title, body, destiny);
  }
}