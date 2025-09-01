import { create } from "zustand";
import { ChatroomsState, IChatroom } from "../types";

export const useChatroomsStore = create<ChatroomsState>((set) => ({
  connectedChatrooms: [],
  addConnectedChatroom: (chatroom: IChatroom) =>
    set((state) => ({
      connectedChatrooms: [...state.connectedChatrooms, chatroom],
    })),
  deleteConnectedChatroom: (roomId: string) =>
    set((state) => ({
      connectedChatrooms: state.connectedChatrooms.filter(
        (openChatroom) => openChatroom.roomId !== roomId
      ),
    })),

  clearConnectedChatrooms: () =>
    set(() => ({
      connectedChatrooms: [],
    })),

  openChatrooms: [],
  setOpenChatrooms: (openChatrooms: IChatroom[]) =>
    set((state) => ({
      openChatrooms,
    })),

  joinChatroom: undefined,
  setJoinChatroom: (joinChatroom: IChatroom | undefined) =>
    set(() => ({
      joinChatroom,
    })),
}));
