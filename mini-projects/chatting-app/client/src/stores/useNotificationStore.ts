import { create } from "zustand";
import { NotificationState, INotification } from "../types";

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (notifications: INotification[]) =>
    set(() => ({
      notifications,
    })),
  addNotification: (notification: INotification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  deleteNotification: (notificationId: string) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (n) => n.notificationId !== notificationId
      ),
    })),
}));
