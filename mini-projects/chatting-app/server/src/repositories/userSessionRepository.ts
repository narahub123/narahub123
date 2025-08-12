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
  ): Promise<string> {
    try {
      const userSession = {
        userId,
        refreshToken,
        createdAt: FieldValue.serverTimestamp(),
        expiredAt: Timestamp.fromDate(new Date(Date.now() + 1000 * 60 * 60)),
      };

      const docRef = this.userSessionCollection.doc();

      await docRef.set(userSession);

      return docRef.id;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 사용자 세션 가져오기
  async getUserSessionById(sessionId: string) {
    try {
      return await this.userSessionCollection.doc(sessionId).get();
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 사용자 세션 삭제하기
  async deleteUserSessionById(sessionId: string): Promise<WriteResult> {
    try {
      return await this.userSessionCollection.doc(sessionId).delete();
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }
}

export default new UseSessionRepository();
