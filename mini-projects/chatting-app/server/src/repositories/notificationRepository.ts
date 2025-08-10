import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { db } from "../config";

class NotificationRepository {
  private notificationCollection: CollectionReference<DocumentData>;

  constructor() {
    this.notificationCollection = db.collection("notifications");
  }
}

export default new NotificationRepository();
