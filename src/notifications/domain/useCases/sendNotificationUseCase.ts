import { Notification } from "../../../shared/contracts/notifications/entities/notification";
import { NotificationStatus } from "../../../shared/contracts/notifications/enum/notificationStatus.enum";
import { NotificationType } from "../../../shared/contracts/notifications/enum/notificationType.enum";
import { UseCase } from "../../../shared/contracts/domain/useCase";
import { MailerProvider } from "../infra/providers/mailerProvider";
import { PushProvider } from "../infra/providers/pushProvider";
import { TranslationManager } from "../../../shared/contracts/translations/facade/translationManager";
import { injectable } from "../../../shared/decorators/di";

/**
 * Business logic when is sending an notification 
 */
@injectable()
export class SendNotificationUseCase implements UseCase<Notification, NotificationStatus> {

  /**
   * Injection through dependency injector
   */
  constructor(
    private readonly pusher: PushProvider,
    private readonly mailer: MailerProvider
  ) {}

  /**
   * Send notification request by type
   * @param Notification notificationRequest
   * @returns NotificationStatus
   */
  public call(notificationRequest: Notification): NotificationStatus {
    if (notificationRequest.type !== NotificationType.push) {
      return this.mailer.send(
        notificationRequest.title, 
        notificationRequest.body,
        notificationRequest.id
      );
    }
    return this.pusher.send(
      notificationRequest.title,
      notificationRequest.body,
      notificationRequest.id
    );
  }
}