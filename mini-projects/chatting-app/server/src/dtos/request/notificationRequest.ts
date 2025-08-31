export type NotificationType = "chatrooms" | "friends";

export interface NotificationCreateDto {
  receiver: string;
  sender: string;
  type: NotificationType;
  text: string;
  createdAt: Date;
}
