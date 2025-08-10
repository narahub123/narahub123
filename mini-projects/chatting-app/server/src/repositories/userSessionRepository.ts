import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { db } from "../config";

class UseSessionRepository {
  private userSessionCollection: CollectionReference<DocumentData>;

  constructor() {
    this.userSessionCollection = db.collection("user_sessions");
  }
}

export default new UseSessionRepository();
