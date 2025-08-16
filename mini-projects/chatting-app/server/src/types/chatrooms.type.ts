import { FieldValue } from "firebase-admin/firestore";

export interface ChatroomCreateType {
  roomTitle: string;
  roomIntro: string;
  roomCapacity: number;
  roomProfileImage: string;
  roomCoverImage: string;
  creator: string;
  participants: string[];
  roomType: "group" | "private";
  isSecret: boolean;
  roomPassword?: string;
  createdAt: FieldValue;
}

export interface ChatroomUserInfo {
  email: string;
  username: string;
  profileImage: string;
  joinedAt: Date;
  lastEnteredAt: Date;
  lastReadMessageId?: string;
}
