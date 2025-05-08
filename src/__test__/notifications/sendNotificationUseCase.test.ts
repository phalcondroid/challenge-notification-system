import { SendNotificationUseCase } from "../../notifications/domain/useCases/sendNotificationUseCase";
import { Notification } from "../../shared/contracts/notifications/entities/notification";
import { NotificationStatus } from "../../shared/contracts/notifications/enum/notificationStatus.enum";
import { NotificationType } from "../../shared/contracts/notifications/enum/notificationType.enum";
import { Locale } from "../../shared/contracts/translations/enums/locale.enum";

describe("SendNotificationUseCase", () => {
  let pushProviderMock: { send: jest.Mock };
  let mailerProviderMock: { send: jest.Mock };
  let useCase: SendNotificationUseCase;
  let notification: Notification;

  beforeEach(() => {
    pushProviderMock = { send: jest.fn() };
    mailerProviderMock = { send: jest.fn() };

    useCase = new SendNotificationUseCase(
      pushProviderMock as any,
      mailerProviderMock as any
    );
  });

  describe("when notification type is EMAIL", () => {
    it("should send an email and return SENT status", async () => {
      // Arrange (Given)
      notification = {
        id: "11111111-1111-1111-1111-111111111111",
        userId: "user-123",
        type: NotificationType.email,
        rule: 1,
        title: "Mock Notification Title",
        body: "This is a mock notification body.",
        locale: Locale.en,
        createdAt: new Date("2023-01-01T00:00:00Z"),
      };

      mailerProviderMock.send.mockResolvedValue(true);

      // Act (When)
      const result = await useCase.call(notification);

      // Assert (Then)
      expect(mailerProviderMock.send).toHaveBeenCalledWith(notification);
      expect(result).toBe(NotificationStatus.sent);
    });
  });

  describe("when notification type is PUSH", () => {
    it("should send a push notification and return SENT status", async () => {
      // Arrange
      notification = {
        id: "11111111-1111-1111-1111-111111111111",
        userId: "user-123",
        type: NotificationType.email,
        rule: 1,
        title: "Mock Notification Title",
        body: "This is a mock notification body.",
        locale: Locale.en,
        createdAt: new Date("2023-01-01T00:00:00Z"),
      };

      pushProviderMock.send.mockResolvedValue(true);

      // Act
      const result = await useCase.call(notification);

      // Assert
      expect(pushProviderMock.send).toHaveBeenCalledWith(notification);
      expect(result).toBe(NotificationStatus.sent);
    });
  });

  describe("when notification type is unsupported", () => {
    it("should return FAILED status", async () => {
      // Arrange
      notification = {
        id: "11111111-1111-1111-1111-111111111111",
        userId: "user-123",
        type: NotificationType.email,
        rule: 1,
        title: "Mock Notification Title",
        body: "This is a mock notification body.",
        locale: Locale.en,
        createdAt: new Date("2023-01-01T00:00:00Z"),
      };

      // Act
      const result = await useCase.call(notification);

      // Assert
      expect(result).toBe(NotificationStatus.failed);
    });
  });
});
