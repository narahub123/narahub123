import { ChatroomUserInfo } from "./stores";

export type ImageType = {
  file: File | string;
  preview: string;
};

export type PageType = "friends" | "chats";

export interface ChatInfo {
  sender: string;
  text?: string | undefined;
  images?: string | undefined;
  files?: string | undefined;
  videos?: string | undefined;
  createdAt: Date;
  isDeleted: boolean;
  unread: string[];
  chatId: string;
}

export interface ChatroomDto {
  roomTitle: string;
  roomIntro: string;
  roomCapacity: number;
  roomProfileImage: string;
  roomCoverImage: string;
  isSecret: boolean;
  roomPassword: string | null;
}

export interface ChatroomInfo extends ChatroomDto {
  creator: string;
  participants: ChatroomUserInfo[];
  roomType: "group" | "private";
  createdAt: Date;
  lastMessage: ChatroomLastMessage;
}

export interface ChatroomLastMessage {
  sender: string;
  createdAt: Date;
  text: string;
}
