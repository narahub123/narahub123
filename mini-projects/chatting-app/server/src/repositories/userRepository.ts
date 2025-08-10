import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { db } from "../config";

class UserRepository {
  private userCollection: CollectionReference<DocumentData>;

  constructor() {
    this.userCollection = db.collection("users");
  }
}

export default new UserRepository();
