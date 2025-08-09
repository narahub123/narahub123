import { create } from "zustand";
import { OpenState } from "../types";

export const useOpenStore = create<OpenState>((set) => ({
  isAuthMenuOpen: false,
  setIsAuthMenuOpen: (updater) =>
    set((state) => ({
      isAuthMenuOpen: updater(state.isAuthMenuOpen),
    })),
}));
