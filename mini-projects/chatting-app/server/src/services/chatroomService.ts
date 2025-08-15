import { chatroomRepository } from "../repositories";
import { ChatroomCreateType } from "../types";

class ChatroomService {
  async createChatroom(roomInfo: ChatroomCreateType) {
    const roomId = await chatroomRepository.createChatroom(roomInfo);

    return roomId;
  }
}

export default new ChatroomService();
