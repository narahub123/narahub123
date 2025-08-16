import { create } from "zustand";
import { UserInfo, UserState } from "../types";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  // 유저 정보 추가
  setUserInfo: (user: UserInfo) =>
    set((state) => ({
      ...state,
      user,
    })),
  // 유저 정보 삭제
  clearUserInfo: () =>
    set((state) => ({
      ...state,
      user: null,
    })),
  // 채팅방 추가
  addChatroom: (roomId: string) =>
    set((state) => ({
      ...state,
      user: {
        ...state.user!,
        chatrooms: [...state.user!.chatrooms, roomId],
      },
    })),
}));
