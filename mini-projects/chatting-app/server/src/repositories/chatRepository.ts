import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { db } from "../config";

class ChatRepository {
  private chatCollection: CollectionReference<DocumentData>;

  constructor() {
    this.chatCollection = db.collection("chats");
  }
}

export default new ChatRepository();
