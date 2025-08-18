import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  FieldValue,
} from "firebase-admin/firestore";
import { db } from "../config";
import {
  ChatInfoType,
  ChatroomCreateType,
  ChatroomLastMessage,
  ChatroomParticipantType,
} from "../types";
import { mapFirebaseError } from "../utils";

class ChatroomRepository {
  private chatroomCollection: CollectionReference<DocumentData>;

  constructor() {
    this.chatroomCollection = db.collection("chatrooms");
  }

  // 채팅방 만들기
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

  // 채팅방 가입
  async joinChatroom(roomId: string, userInfo: ChatroomParticipantType) {
    try {
      await this.chatroomCollection.doc(roomId).update({
        participants: FieldValue.arrayUnion(userInfo),
      });
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 채팅방 정보 조회
  async getChatroomInfoById(roomId: string) {
    try {
      const snapshot = this.chatroomCollection.doc(roomId).get();

      return snapshot;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 채팅방 대화 조회
  async getChatroomChatsById(roomId: string) {
    try {
      return await this.chatroomCollection
        .doc(roomId)
        .collection("chats")
        .orderBy("createdAt", "asc")
        .limitToLast(20)
        .get();
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // chat 저장하기
  async saveChat(roomId: string, chatData: ChatInfoType) {
    try {
      const chatDoc = this.chatroomCollection.doc(roomId).collection("chats");

      const chatRef = await chatDoc.add(chatData);

      return chatRef;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 채팅방 마지막 메시지 업데이트
  async updateChatroomLastMessage(
    roomId: string,
    lastMessage: ChatroomLastMessage
  ) {
    try {
      const chatroomRef = this.chatroomCollection.doc(roomId);

      await chatroomRef.set({ lastMessage }, { merge: true });
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 사용자의 마지막 읽은 메시지 업데이트
  async updateParticipantLastMessageId(
    roomId: string,
    participants: ChatroomParticipantType[]
  ) {
    try {
      const chatroomRef = this.chatroomCollection.doc(roomId);

      await chatroomRef.update({ participants });
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 사용자의 채팅방에서 탈퇴
  async leaveChatroom(roomId: string, participants: ChatroomParticipantType[]) {
    try {
      const chatroomRef = this.chatroomCollection.doc(roomId);

      chatroomRef.set({ participants }, { merge: true });
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 특정 챗 조회하기
  async getChatById(roomId: string, chatId: string): Promise<DocumentSnapshot> {
    try {
      const chat = await this.chatroomCollection
        .doc(roomId)
        .collection("chats")
        .doc(chatId)
        .get();

      return chat;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  // 채팅방에서 사용자의 안 읽은 메시지 읽음 처리
  async checkReadMessages(roomId: string, email: string, createdAt: Date) {
    try {
      const chatsRef = this.chatroomCollection.doc(roomId).collection("chats");

      const result = await chatsRef.where("createdAt", ">=", createdAt).get();

      const batch = db.batch();

      console.log(result.docs.length);

      if (result.empty) return "";

      const lastChatId = result.docs[result.docs.length - 1].id;

      result.docs.forEach((doc) => {
        const data = doc.data();
        const unread = data.unread || [];

        if (unread.includes(email)) {
          const newUnread = unread.filter((u: string) => u !== email);

          batch.update(doc.ref, { unread: newUnread });
        }
      });

      await batch.commit();

      return lastChatId;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }
}

export default new ChatroomRepository();
