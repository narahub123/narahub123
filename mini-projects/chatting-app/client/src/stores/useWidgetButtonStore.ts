import { create } from "zustand";
import { WidgetButtonState } from "../types";

export const useWidgetButtonStore = create<WidgetButtonState>((set) => ({
  isAuthMenuOpen: false,
  setIsAuthMenuOpen: (updater) =>
    set((state) => ({
      isAuthMenuOpen: updater(state.isAuthMenuOpen),
    })),
}));
