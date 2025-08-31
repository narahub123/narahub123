import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { db } from "../config";
import { mapFirebaseError } from "../utils";
import { NotificationCreateDto } from "../dtos";

class NotificationRepository {
  private notificationCollection: CollectionReference<DocumentData>;

  constructor() {
    this.notificationCollection = db.collection("notifications");
  }

  // 알림 생성하기
  async createNotification(notificationRequest: NotificationCreateDto) {
    try {
      // 알림 생성
      const notiRef = this.notificationCollection.doc();

      await notiRef.set(notificationRequest);

      return notiRef.id;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  }

  // 알림 목록 조회
  async getNotificationList(email: string) {
    try {
      const snapshot = await this.notificationCollection
        .where("receiver", "==", email)
        .orderBy("createdAt", "desc")
        .limit(20)
        .get();

      return snapshot;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  }

  // 알림 조회
  async getNotificationById(notificationId: string) {
    try {
      const snapshot = this.notificationCollection.doc(notificationId).get();

      return snapshot;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  }

  // 알림 삭제
  async deleteNotificationById(notificationId: string) {
    try {
      return await this.notificationCollection.doc(notificationId).delete();
    } catch (error) {
      throw mapFirebaseError(error);
    }
  }
}

export default new NotificationRepository();
