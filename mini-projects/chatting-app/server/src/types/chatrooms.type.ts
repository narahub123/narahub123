import { FieldValue } from "firebase-admin/firestore";

export interface ChatroomCreateType {
  roomTitle: string;
  roomIntro: string;
  roomCapacity: number;
  roomProfileImage: string;
  roomCoverImage: string;
  creator: string;
  participants: ChatroomUserInfo[];
  roomType: "group" | "private";
  isSecret: boolean;
  roomPassword?: string;
  createdAt: FieldValue;
}

export interface ChatroomUserInfo {
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
  participants: ChatroomUserInfo[];
  roomType: "group" | "private";
  isSecret: boolean;
  roomPassword?: string;
  createdAt: FieldValue;
}

export interface ChatroomResponseDto extends ChatroomDocType {
  roomId: string;
}
