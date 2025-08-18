import { create } from "zustand";
import { ImageType, AuthState } from "../types";

const signupInitialState = {
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

export const useAuthStore = create<AuthState>((set) => ({
  // 회원가입 사용자 정보
  signup: signupInitialState,
  // 로그인 사용자 정보
  login: loginInitialState,
  // 회원가입 정보 전송 가능 여부 상태
  canSend: false,
  // 이미지 변경
  setProfileImage: (profileImage: ImageType) =>
    set((state) => ({
      signup: {
        ...state.signup,
        profile_image: profileImage,
      },
    })),
  // 회원가입 사용자 정보 삭제
  clearSignupInfo: () =>
    set(() => ({
      signup: signupInitialState,
    })),
  // 사용자 정보 입력
  setSignupInfo: (id: string, value: string) =>
    set((state) => ({
      signup: {
        ...state.signup,
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
  // 회원가입 사용자 정보 삭제
  clearLoginInfo: () =>
    set(() => ({
      login: loginInitialState,
    })),
}));
