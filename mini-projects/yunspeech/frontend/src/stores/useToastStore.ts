import { create } from "zustand";
import { ToastStore, ToastType } from "../types";

export const useToastStore = create<ToastStore>((set) => ({
  toast: undefined,
  setToast: (toast: ToastType) =>
    set(() => ({
      toast,
    })),
  clearToast: () =>
    set(() => ({
      toast: undefined,
    })),
}));
