import { NotificationAdapter } from "../../../../shared/contracts/notifications/adapters/notificationAdapter";
import { NotificationProvider } from "../../../../shared/contracts/notifications/providers/notificationProvider";

export class SmsProvider implements NotificationProvider {
  constructor(private readonly smsClient: NotificationAdapter) {
    this.smsClient.connect();
  }

  /**
   * Method for push notifications
   * @param title 
   * @param body 
   * @param destiny 
   * @returns 
   */
  public send(title: string, body: string, destiny: string): boolean {
    return this.smsClient.send(title, body, destiny);
  }
}