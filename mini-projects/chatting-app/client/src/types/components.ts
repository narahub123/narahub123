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
