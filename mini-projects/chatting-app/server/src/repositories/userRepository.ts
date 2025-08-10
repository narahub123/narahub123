import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { db } from "../config";

class UserRepository {
  private userCollection: CollectionReference<DocumentData>;

  constructor() {
    this.userCollection = db.collection("users");
  }

  async getUserByEmail(email: string) {
    try {
      const snapshot = await this.userCollection
        .where("email", "==", email)
        .get();

      return snapshot;
    } catch (error) {}
  }
}

export default new UserRepository();
