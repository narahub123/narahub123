import {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
} from "firebase-admin/firestore";
import { db } from "../config";
import { mapFirebaseError } from "../utils";

class UserRepository {
  private userCollection: CollectionReference<DocumentData>;

  constructor() {
    this.userCollection = db.collection("users");
  }

  async getUserByEmail(email: string): Promise<QuerySnapshot<DocumentData>> {
    try {
      const snapshot = await this.userCollection
        .where("email", "==", email)
        .limit(1) // 검색 속도 향상을 위해서
        .get();

      return snapshot;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }
}

export default new UserRepository();
