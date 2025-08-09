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

const loginInitialState = {
  email: "",
  userId: "",
  password: "",
};

export const useSignupStore = create<SignupState>((set) => ({
  // 회원가입 사용자 정보
  user: initialState,
  // 로그인 사용자 정보
  login: loginInitialState,
  // 회원가입 정보 전송 가능 여부 상태
  canSend: false,
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
  // 사용자 정보 입력
  setUserInfo: (id: string, value: string) =>
    set((state) => ({
      user: {
        ...state.user,
        [id]: value,
      },
    })),
  // 회원가입 전송 가능 여부 변경
  setCanSend: (canSend: boolean) =>
    set(() => ({
      canSend,
    })),
  // 로그인 사용자 정보 입력
  setLoginInfo: (id: string, value: string) =>
    set((state) => ({
      login: {
        ...state.login,
        [id]: value,
      },
    })),
}));
