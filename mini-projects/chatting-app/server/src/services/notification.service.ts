import { NotificationCreateDto } from "../dtos";
import { NotFoundError, UnauthorizedError } from "../errors";
import { notificationRepository } from "../repositories";
import { convertTimestamps } from "../utils";

class NotificationService {
  // 알림 생성
  async createNotification(
    notificationRequest: NotificationCreateDto
  ): Promise<string> {
    try {
      const notificationId = await notificationRepository.createNotification(
        notificationRequest
      );

      return notificationId;
    } catch (error) {
      throw error;
    }
  }

  // 알림 목록 조회
  async getNotificationList(email: string) {
    try {
      const snapshot = await notificationRepository.getNotificationList(email);

      if (snapshot.empty) {
        return [];
      }

      const notifications = snapshot.docs.map((doc) => ({
        notificationId: doc.id,
        ...convertTimestamps(doc.data()),
      }));

      return notifications;
    } catch (error) {
      throw error;
    }
  }

  // 알림 조회
  async getNotificaitonById(notificationId: string) {
    try {
      const snapshot = await notificationRepository.getNotificationById(
        notificationId
      );

      if (!snapshot.exists) {
        throw new NotFoundError("알림 조회 실패");
      }

      return {
        notificationId: snapshot.id,
        ...convertTimestamps(snapshot.data()),
      };
    } catch (error) {
      throw error;
    }
  }

  // 알림 삭제
  async deleteNotificationById(notificationId: string, receiver: string) {
    // receiver is email
    try {
      const notification = await this.getNotificaitonById(notificationId);

      // 알림 수신자와 현재 사용자의 일치 여부 확인
      if (notification.receiver !== receiver) {
        throw new UnauthorizedError("권한 없음");
      }
      
      await notificationRepository.deleteNotificationById(notificationId);
    } catch (error) {
      throw error;
    }
  }

  // 알림 전체 삭제
  async deleteAllNotifications(email: string) {
    try {
      const notifications = await this.getNotificationList(email);

      return Promise.all(
        notifications.map((notification) =>
          this.deleteNotificationById(notification.notificationId, email)
        )
      );
    } catch (error) {
      throw error;
    }
  }
}

export default new NotificationService();
