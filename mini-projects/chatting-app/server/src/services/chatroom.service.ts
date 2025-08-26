import { Timestamp } from "firebase-admin/firestore";
import { ConflictError, NotFoundError, UnauthorizedError } from "../errors";
import { chatroomRepository } from "../repositories";
import {
  ChatInfoType,
  ChatroomCreateType,
  ChatroomDocType,
  ChatroomLastMessage,
  ChatroomResponseDto,
  ChatroomParticipantType,
  ChatRequestMessageDto,
  ChatRequestFileDto,
  FileSaveType,
} from "../types";
import userService from "./user.service";
import { convertTimestamps, uploadMultipleFromBuffers } from "../utils";

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

    const chatrooms = snapshot.docs.map((doc) => ({
      roomId: doc.id,
      ...convertTimestamps(doc.data()),
    }));

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
      ...convertTimestamps(result.data() as ChatroomDocType),
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
  async joinChatroom(roomId: string, userInfo: ChatroomParticipantType) {
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

    return (
      snapshot.docs.map((doc) => {
        const chat = doc.data();
        return convertTimestamps({
          chatId: doc.id,
          ...chat,
          images: chat.images.map((i: FileSaveType) => i.secure_url),
          videos: chat.images.map((i: FileSaveType) => i.secure_url),
          files: chat.images.map((i: FileSaveType) => i.secure_url),
        });
      }) ?? []
    );
  }

  // 사용자의 가입된 채팅방 정보 얻기
  async getUserChatroomsInfo(email: string) {
    const user = await userService.getUserByEmail(email);

    const chatroomIds = user.chatrooms;

    return await Promise.all(
      chatroomIds.map((roomId: string) => this.getChatroomInfoById(roomId))
    );
  }

  // 채팅방 마지막 메시지 업데이트
  async updateChatroomLastMessage(
    roomId: string,
    lastMessage: ChatroomLastMessage
  ) {
    try {
      await chatroomRepository.updateChatroomLastMessage(roomId, lastMessage);
    } catch (err) {
      throw err;
    }
  }

  // 참여자의 마지막 메시지 업데이트
  async updateParticipantLastMessageId(
    roomId: string,
    email: string,
    lastReadMessageId: string
  ) {
    try {
      const chatroom = await this.getChatroomInfoById(roomId);

      const participants = chatroom.participants || [];

      const updatedParticipants = participants.map((p) =>
        p.email === email ? { ...p, lastReadMessageId } : p
      );

      await chatroomRepository.updateParticipantLastMessageId(
        roomId,
        updatedParticipants
      );
    } catch (err) {
      throw err;
    }
  }

  async saveChat(msgInfo: ChatRequestMessageDto) {
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

    // 메시지 저장
    const result = await chatroomRepository.saveChat(roomId, newChat);

    // 저장된 메시지를 채팅방의 마지막 메시지로 저장하기
    const lastMessage: ChatroomLastMessage = {
      sender: newChat.sender,
      createdAt: newChat.createdAt,
      text: newChat.text
        ? newChat.text
        : newChat.images
        ? "이미지"
        : newChat.files
        ? "파일"
        : "비디오",
    };
    await this.updateChatroomLastMessage(roomId, lastMessage);

    // 전송한 사용자의 마지막으로 읽은 메시지 변경하기
    await this.updateParticipantLastMessageId(roomId, email, result.id);

    return {
      chatId: result.id,
      ...convertTimestamps(newChat),
    };
  }

  async leaveChatroom(roomId: string, email: string) {
    try {
      // 채팅방이 존재하는 지 확인
      const chatroom = await this.getChatroomInfoById(roomId);

      const hasJoined = await userService.hasUserJoinedRoom(email, roomId);

      if (!hasJoined) {
        throw new UnauthorizedError("가입하지 사용자", "UNAUTHORIZED_TO_LEAVE");
      }

      // 채팅방에서 사용자 삭제
      const participants = chatroom.participants;
      const updatedParticipants = participants.filter((p) => p.email !== email);
      await chatroomRepository.leaveChatroom(roomId, updatedParticipants);

      // 사용자의 chatrooms에서 채팅방 삭제
      await userService.leaveChatroom(email, roomId);
    } catch (err) {
      throw err;
    }
  }

  async getChatById(roomId: string, chatId: string) {
    try {
      const result = await chatroomRepository.getChatById(roomId, chatId);

      if (!result.exists) {
        throw new NotFoundError("챗 조회 실패", "CHAT_NOT_FOUND");
      }

      const chat = result.data();

      if (!chat) {
        throw new NotFoundError("챗 조회 실패", "CHAT_NOT_FOUND");
      }

      return chat;
    } catch (err) {
      throw err;
    }
  }

  async checkReadMessages(
    roomId: string,
    email: string,
    firstUnreadMessageId: string
  ) {
    try {
      const chat = await this.getChatById(roomId, firstUnreadMessageId);

      const createdAt = chat["createdAt"];

      // 읽은 표시로 변경
      const lastChatId = await chatroomRepository.checkReadMessages(
        roomId,
        email,
        createdAt
      );

      if (!lastChatId) return;

      // 사용자의 마지막 읽은 메시지 변경
      await this.updateParticipantLastMessageId(roomId, email, lastChatId);
    } catch (err) {
      throw err;
    }
  }

  async saveFiles(msgInfo: ChatRequestFileDto) {
    const { email, files, roomId, type } = msgInfo;

    // 방의 존재 여부 확인
    const chatroom = await this.getChatroomInfoById(roomId);

    // 사용자가 방의 참여자인지 확인
    await this.findUserInChatroomByEmail(roomId, email);

    // 메시지를 전송한 사용자를 제외한 참여자 배열
    const participants = chatroom.participants
      .map((participant) => participant.email)
      .filter((e) => e !== email);

    // 이미지 업로드
    const result = await uploadMultipleFromBuffers(files);

    const newChat: ChatInfoType = {
      sender: email,
      createdAt: new Date(),
      isDeleted: false,
      unread: [...participants],
      [`${files[0].type}s`]: result,
    };

    // 메시지 저장
    const result2 = await chatroomRepository.saveChat(roomId, newChat);

    // 저장된 메시지를 채팅방의 마지막 메시지로 저장하기
    const lastMessage: ChatroomLastMessage = {
      sender: newChat.sender,
      createdAt: newChat.createdAt,
      text: newChat.text
        ? newChat.text
        : newChat.images
        ? "이미지"
        : newChat.files
        ? "파일"
        : "비디오",
    };
    await this.updateChatroomLastMessage(roomId, lastMessage);

    // 전송한 사용자의 마지막으로 읽은 메시지 변경하기
    await this.updateParticipantLastMessageId(roomId, email, result2.id);

    return {
      chatId: result2.id,
      ...convertTimestamps(newChat),
      [`${files[0].type}s`]: result.map((r) => r.secure_url),
    };
  }
}

export default new ChatroomService();
