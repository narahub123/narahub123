import { create } from "zustand";
import { ChatroomsState } from "../types";

export const useChatroomsStore = create<ChatroomsState>((set) => ({
  openChatrooms: [],
  addOpenChatroom: (roomId: string) =>
    set((state) => ({
      openChatrooms: [...state.openChatrooms, roomId],
    })),
  deleteOpenChatroom: (roomId: string) =>
    set((state) => ({
      openChatrooms: state.openChatrooms.filter(
        (openChatroom) => openChatroom !== roomId
      ),
    })),
}));
