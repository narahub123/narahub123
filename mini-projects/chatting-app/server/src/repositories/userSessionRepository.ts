import {
  CollectionReference,
  DocumentData,
  FieldValue,
  Timestamp,
  WriteResult,
} from "firebase-admin/firestore";
import { db } from "../config";
import { mapFirebaseError } from "../utils";

class UseSessionRepository {
  private userSessionCollection: CollectionReference<DocumentData>;

  constructor() {
    this.userSessionCollection = db.collection("user_sessions");
  }

  // 사용자 세션 생성
  async createUserSession(
    userId: string,
    refreshToken: string
  ): Promise<WriteResult> {
    try {
      const userSession = {
        refreshToken,
        createdAt: FieldValue.serverTimestamp(),
        expiredAt: Timestamp.fromDate(new Date(Date.now() + 1000 * 60 * 60)),
      };

      return await this.userSessionCollection.doc(userId).set(userSession);
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }
}

export default new UseSessionRepository();
