import { NotFoundError } from "../errors";
import { chatroomRepository } from "../repositories";
import { ChatroomCreateType, ChatroomUserInfo } from "../types";

class ChatroomService {
  async createChatroom(roomInfo: ChatroomCreateType) {
    const roomId = await chatroomRepository.createChatroom(roomInfo);

    return roomId;
  }

  // 오픈 채팅방 목록 가져오기
  async getGroupChatrooms() {
    const snapshot = await chatroomRepository.getOpenChatrooms();

    if (snapshot.empty) {
      throw new NotFoundError(
        "오픈 채팅방 목록 없음",
        "OPEN_CHATROOMS_NOT_FOUND"
      );
    }

    const chatrooms = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        roomId: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
      };
    });

    return chatrooms;
  }

  async joinChatroom(roomId: string, userInfo: ChatroomUserInfo) {
    await chatroomRepository.joinChatroom(roomId, userInfo);
  }
}

export default new ChatroomService();
