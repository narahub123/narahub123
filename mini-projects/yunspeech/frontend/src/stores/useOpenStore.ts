import { create } from "zustand";
import { OpenState } from "../types";

export const useOpenStore = create<OpenState>((set) => ({
  isToastOpen: false,
  setIsToastOpen: (isToastOpen: boolean) =>
    set(() => ({
      isToastOpen,
    })),
  isChooseTimeSlotModalOpen: false,
  setIsChooseTimeSlotModalOpen: (isChooseTimeSlotModalOpen: boolean) =>
    set(() => ({
      isChooseTimeSlotModalOpen,
    })),
}));
