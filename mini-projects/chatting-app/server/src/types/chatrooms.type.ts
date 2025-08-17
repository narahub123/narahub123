import { FieldValue } from "firebase-admin/firestore";

export interface ChatroomCreateType {
  roomTitle: string;
  roomIntro: string;
  roomCapacity: number;
  roomProfileImage: string;
  roomCoverImage: string;
  creator: string;
  participants: ChatroomParticipantType[];
  roomType: "group" | "private";
  isSecret: boolean;
  roomPassword?: string;
  createdAt: FieldValue;
}

export interface ChatroomParticipantType {
  roomId?: string;
  email: string;
  username: string;
  profileImage: string;
  joinedAt: Date;
  lastEnteredAt: Date;
  lastReadMessageId?: string;
}

export interface ChatroomDocType {
  roomTitle: string;
  roomIntro: string;
  roomCapacity: number;
  roomProfileImage: string;
  roomCoverImage: string;
  creator: string;
  participants: ChatroomParticipantType[];
  roomType: "group" | "private";
  isSecret: boolean;
  roomPassword?: string;
  createdAt: FieldValue;
  lastMessageId?: ChatroomLastMessage;
}

export interface ChatroomResponseDto extends ChatroomDocType {
  roomId: string;
}

export interface ChatRequestDto {
  roomId: string;
  email: string;
  text?: string;
  images?: string;
  files?: string;
  videos?: string;
}

export interface ChatInfoType {
  sender: string; // 이메일
  text?: string;
  images?: string;
  files?: string;
  videos?: string;
  createdAt: Date;
  isDeleted: boolean;
  unread: string[];
}

export interface ChatroomLastMessage {
  sender: string; // 이메일
  createdAt: Date;
  text: string;
}
