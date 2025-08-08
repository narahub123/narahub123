import { create } from "zustand";
import { LoginStoreState } from "../types";

export const useLoginStore = create<LoginStoreState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) =>
    set(() => ({
      isLoggedIn,
    })),
}));
