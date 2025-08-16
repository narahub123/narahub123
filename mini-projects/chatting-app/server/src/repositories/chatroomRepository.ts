import { CollectionReference, DocumentData } from "firebase-admin/firestore";
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

  // 단체방 목록 가져오기
  async getOpenChatrooms() {
    try {
      const openChatrooms = await this.chatroomCollection
        .where("roomType", "==", "group")
        .orderBy("createdAt", "desc")
        .limit(20)
        .get();

      return openChatrooms;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }
}

export default new ChatroomRepository();
