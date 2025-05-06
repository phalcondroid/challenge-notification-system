import { NotificationAdapter } from "../../../../shared/contracts/notifications/adapters/notificationAdapter";
import { NotificationStatus } from "../../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { NotificationProvider } from "../../../../shared/contracts/notifications/providers/notificationProvider";

export class PushProvider implements NotificationProvider {

  constructor(private readonly pushClient: NotificationAdapter) {
    this.pushClient.connect();
  }

  /**
   * Method for push notifications
   * @param title 
   * @param body 
   * @param destiny 
   * @returns 
   */
  public send(title: string, body: string, destiny: string): NotificationStatus {
    return this.pushClient.send(title, body, destiny);
  }
}