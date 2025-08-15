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
