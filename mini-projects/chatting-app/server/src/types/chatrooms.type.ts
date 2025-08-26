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

export type ChatRequestType = "unread" | "message" | "files";

export interface ChatRequestBaseDto {
  type: ChatRequestType;
  roomId: string;
  email: string; // sender
}

export interface ChatRequestMessageDto extends ChatRequestBaseDto {
  text?: string;
}

export type FileType = "image" | "video" | "file";

export interface FileInfo {
  file: Buffer;
  type: FileType;
}

export interface ChatRequestFileDto extends ChatRequestBaseDto {
  files: FileInfo[];
}

export interface ChatRequestUnreadDto extends ChatRequestBaseDto {
  firstUnreadMessageId: string;
}

export interface FileSaveType {
  secure_url: string;
  public_id: string;
  type: FileType;
}

export interface ChatInfoType {
  sender: string; // 이메일
  text?: string;
  images?: FileSaveType[];
  files?: FileSaveType[];
  videos?: FileSaveType[];
  createdAt: Date;
  isDeleted: boolean;
  unread: string[];
}

export interface ChatroomLastMessage {
  sender: string; // 이메일
  createdAt: Date;
  text: string;
}
