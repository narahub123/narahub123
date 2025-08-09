import { create } from "zustand";
import { OpenState } from "../types";

export const useOpenStore = create<OpenState>((set) => ({
  isAuthMenuOpen: false,
  setIsAuthMenuOpen: (updater) =>
    set((state) => ({
      isAuthMenuOpen: updater(state.isAuthMenuOpen),
    })),
  isSignupModalOpen: false,
  setIsSignupModalOpen: (isSignupModalOpen: boolean) =>
    set(() => ({
      isSignupModalOpen,
    })),
  isEmailSignupModalOpen: false,
  setIsEmailSignupModalOpen: (isEmailSignupModalOpen: boolean) =>
    set(() => ({
      isEmailSignupModalOpen,
    })),
  isLoginModalOpen: false,
  setIsLoginModalOpen: (isLoginModalOpen: boolean) =>
    set(() => ({
      isLoginModalOpen,
    })),
  isResetPasswordModalOpen: false,
  setIsResetPasswordModalOpen: (isResetPasswordModalOpen: boolean) =>
    set(() => ({
      isResetPasswordModalOpen,
    })),
}));
