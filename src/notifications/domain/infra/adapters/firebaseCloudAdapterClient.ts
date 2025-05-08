import { NotificationAdapter } from "../../../../shared/contracts/notifications/adapters/notificationAdapter";
import { NotificationStatus } from "../../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { ProviderConnectionError } from "../../../../shared/contracts/notifications/exceptions/providerConnectionError";
import { ProviderSendError } from "../../../../shared/contracts/notifications/exceptions/providerSendError";

export class FirebaseCloudAdapterClient implements NotificationAdapter {
  
  private firebaseInstance;

  constructor() {
    this.firebaseInstance = { connect: () => true, send: (any: any) => true};
  }

  public connect(): boolean {
    const connection = this.firebaseInstance.connect();
    if (connection) {
      return connection;
    }
    throw new ProviderConnectionError;
  }

  /**
   * Customizable adapter for aws sns to send push messages
   * @param string title 
   * @param string body 
   * @param string destiny 
   * @returns boolean
   */
  public send(title: string, body: string, destiny: string): NotificationStatus {
    const result = this.firebaseInstance.send(title, body, destiny);
    if (result)  {
      return result;
    }
    throw new ProviderSendError("Custom firebase information error"); 
  }
}