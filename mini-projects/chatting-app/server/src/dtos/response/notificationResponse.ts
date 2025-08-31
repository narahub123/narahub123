import { NotificationType } from "../request";

export interface NotificationResponseDto {
  notificationId: string;
  receiver: string;
  sender: string;
  type: NotificationType;
  text: string;
  createdAt: Date;
}
