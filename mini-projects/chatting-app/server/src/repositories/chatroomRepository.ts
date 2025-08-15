import {
  CollectionReference,
  DocumentData,
  FieldValue,
} from "firebase-admin/firestore";
import { db } from "../config";
import { ChatroomCreateType } from "../types";
import { mapFirebaseError } from "../utils";

class ChatroomRepository {
  private chatroomCollection: CollectionReference<DocumentData>;

  constructor() {
    this.chatroomCollection = db.collection("chatrooms");
  }

  async createChatroom(roomInfo: ChatroomCreateType) {
    try {
      const docRef = this.chatroomCollection.doc();

      await docRef.set(roomInfo);

      return docRef.id;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }
}

export default new ChatroomRepository();
