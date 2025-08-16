import { create } from "zustand";
import { ChatroomsState } from "../types";

export const useChatroomsStore = create<ChatroomsState>((set) => ({
  connectedChatrooms: [],
  addConnectedChatroom: (roomId: string) =>
    set((state) => ({
      connectedChatrooms: [...state.connectedChatrooms, roomId],
    })),
  deleteConnectedChatroom: (roomId: string) =>
    set((state) => ({
      connectedChatrooms: state.connectedChatrooms.filter(
        (openChatroom) => openChatroom !== roomId
      ),
    })),

  openChatrooms: [],
  setOpenChatrooms: (roomIds: string[]) =>
    set((state) => ({
      openChatrooms: roomIds,
    })),
}));
