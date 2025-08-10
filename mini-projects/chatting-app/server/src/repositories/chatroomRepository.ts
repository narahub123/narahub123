import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { db } from "../config";

class ChatroomRepository {
  private chatroomCollection: CollectionReference<DocumentData>;

  constructor() {
    this.chatroomCollection = db.collection("chatrooms");
  }
}

export default new ChatroomRepository();
