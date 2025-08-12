import { Timestamp } from "firebase-admin/firestore";

export interface IUser {
  userId: string;
  username: string;
  password: string;
  profileImage: string;
  createdAt: Timestamp;
  emailVerified: boolean;
  role: "USER" | "ADMIN";
  status: "OFFLINE";
  friends: string[];
  chatrooms: string[];
}
