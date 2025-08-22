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
  isChatModalOpen: false,
  setIsChatModalOpen: (isChatModalOpen: boolean) =>
    set(() => ({
      isChatModalOpen,
    })),
  isChatroomOpen: false,
  setIsChatroomOpen: (isChatroomOpen: boolean) =>
    set(() => ({
      isChatroomOpen,
    })),
  isChatroomCreateModalOpen: false,
  setIsChatroomCreateModalOpen: (isChatroomCreateModalOpen: boolean) =>
    set(() => ({
      isChatroomCreateModalOpen,
    })),

  isOpenChatroomListModalOpen: false,
  setIsOpenChatroomListModalOpen: (isOpenChatroomListModalOpen: boolean) =>
    set(() => ({
      isOpenChatroomListModalOpen,
    })),

  isChatroomJoinModalOpen: false,
  setIsChatroomJoinModalOpen: (isChatroomJoinModalOpen: boolean) =>
    set(() => ({
      isChatroomJoinModalOpen,
    })),

  isChatroomSettingOpen: false,
  setIsChatroomSettingOpen: (isChatroomSettingOpen: boolean) =>
    set(() => ({
      isChatroomSettingOpen,
    })),
  isMoreDropdownOpen: false,
  setIsMoreDropdownOpen: (isMoreDropdownOpen: boolean) =>
    set(() => ({
      isMoreDropdownOpen,
    })),
  isToastOpen: false,
  setIsToastOpen: (isToastOpen: boolean) =>
    set(() => ({
      isToastOpen,
    })),
  isUserProfileModalOpen: false,
  setIsUserProfileModalOpen: (isUserProfileModalOpen: boolean) =>
    set(() => ({
      isUserProfileModalOpen,
    })),

  isCheckPasswordModalOpen: false,
  setIsCheckPasswordModalOpen: (isCheckPasswordModalOpen: boolean) =>
    set(() => ({
      isCheckPasswordModalOpen,
    })),
}));
