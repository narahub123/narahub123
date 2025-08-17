import { ConflictError, NotFoundError } from "../errors";
import { chatroomRepository } from "../repositories";
import {
  ChatInfoType,
  ChatRequestDto,
  ChatroomCreateType,
  ChatroomDocType,
  ChatroomResponseDto,
  ChatroomUserInfo,
} from "../types";
import userService from "./userService";

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

  // 채팅방 정보 가져오기
  async getChatroomInfoById(roomId: string): Promise<ChatroomResponseDto> {
    const result = await chatroomRepository.getChatroomInfoById(roomId);

    if (!result.exists) {
      throw new NotFoundError("채팅방 조회 실패", "CHATROOM_NOT_FOUND");
    }

    return {
      roomId: result.id,
      ...(result.data() as ChatroomDocType),
    };
  }

  // 이메일 사용해 채팅방의 사용자 존재 여부 확인
  async findUserInChatroomByEmail(roomId: string, email: string) {
    try {
      const chatroom = await this.getChatroomInfoById(roomId);

      const user = chatroom.participants.find((user) => user.email === email);

      return user;
    } catch (error) {
      throw error;
    }
  }

  // 채팅방 가입하기
  async joinChatroom(roomId: string, userInfo: ChatroomUserInfo) {
    try {
      // 기존 가입자인지 여부 확인하기
      const user = await this.findUserInChatroomByEmail(roomId, userInfo.email);

      if (user) {
        throw new ConflictError("이미 가입된 가입자", "DUPLICATE_USER");
      }

      await chatroomRepository.joinChatroom(roomId, userInfo);
    } catch (error) {
      throw error;
    }
  }

  // 채팅방 대화 가져오기
  async getChatroomChatsById(roomId: string) {
    const snapshot = await chatroomRepository.getChatroomChatsById(roomId);

    return snapshot.docs.map((doc) => doc.data()) ?? [];
  }

  // 사용자의 가입된 채팅방 정보 얻기
  async getUserChatroomsInfo(email: string) {
    const user = await userService.getUserByEmail(email);

    const chatroomIds = user.chatrooms;

    return await Promise.all(
      chatroomIds.map((roomId: string) => this.getChatroomInfoById(roomId))
    );
  }

  async saveChat(msgInfo: ChatRequestDto) {
    const { roomId, email, ...rest } = msgInfo;

    // 방의 존재 여부 확인
    const chatroom = await this.getChatroomInfoById(roomId);

    // 사용자가 방의 참여자인지 확인
    await this.findUserInChatroomByEmail(roomId, email);

    // 메시지를 전송한 사용자를 제외한 참여자 배열
    const participants = chatroom.participants
      .map((participant) => participant.email)
      .filter((e) => e !== email);

    const newChat: ChatInfoType = {
      sender: email,
      ...rest,
      createdAt: new Date(),
      isDeleted: false,
      unread: [...participants],
    };

    const result = await chatroomRepository.saveChat(roomId, newChat);

    return {
      chatId: result.id,
      ...newChat,
    };
  }
}

export default new ChatroomService();
