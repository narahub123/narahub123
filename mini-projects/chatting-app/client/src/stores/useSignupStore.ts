import { create } from "zustand";
import { ImageType, SignupState } from "../types";

const initialState = {
  profile_image: null,
  userId: "",
  username: "",
  email: "",
  password: "",
  password_confirm: "",
};

export const useSignupStore = create<SignupState>((set) => ({
  // 회원가입 사용자 정보
  user: initialState,
  // 이미지 변경
  setProfileImage: (profileImage: ImageType) =>
    set((state) => ({
      user: {
        ...state.user,
        profile_image: profileImage,
      },
    })),
  // 회원가입 사용자 정보 삭제
  cleanSignupUser: () =>
    set(() => ({
      user: initialState,
    })),
  setUserInfo: (id: string, value: string) =>
    set((state) => ({
      user: {
        ...state.user,
        [id]: value,
      },
    })),
}));
