import { ChatroomUserInfo } from "./stores";

export type ImageType = {
  file: File;
  preview: string;
};

export type PageType = "friends" | "chats";

export interface Chat {
  roomId: string;
  userId: string;
  text: string;
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
}
