import { ImageType } from "./components";

export type LoginStoreState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export type OpenState = {
  isAuthMenuOpen: boolean;
  setIsAuthMenuOpen: (updater: (prev: boolean) => boolean) => void;
  isSignupModalOpen: boolean;
  setIsSignupModalOpen: (isOpen: boolean) => void;
  isEmailSignupModalOpen: boolean;
  setIsEmailSignupModalOpen: (isOpen: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  isResetPasswordModalOpen: boolean;
  setIsResetPasswordModalOpen: (isOpen: boolean) => void;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (isOpen: boolean) => void;
  isChatroomOpen: boolean;
  setIsChatroomOpen: (isOpen: boolean) => void;
  isChatroomCreateModalOpen: boolean;
  setIsChatroomCreateModalOpen: (isChatroomCreateModalOpen: boolean) => void;
};

export type SignupInfoType = {
  userId: string; // 유저 아이디
  username: string; // 유저 이름
  email: string; // 이메일
  password: string; // 비밀번호
  password_confirm: string; // 비밀번호 확인
  profile_image: ImageType | null; // 프로필 사진
};

export type LoginInfoType = {
  userId?: string;
  email?: string;
  password: string;
};

export type AuthState = {
  signup: SignupInfoType; // 회원가입 사용자 정보
  setProfileImage: (profileImage: ImageType) => void; // 이미지 변경
  setSignupInfo: (id: string, value: string) => void;
  cleanSignupInfo: () => void; // 회원가입 사용자 정보 삭제
  canSend: boolean; // 회원가입 버튼 유효성 통과 여부 상태
  setCanSend: (canSend: boolean) => void;
  login: LoginInfoType;
  setLoginInfo: (id: string, value: string) => void;
  cleanLoginInfo: () => void;
};

export interface UserInfo {
  userId: string;
  username: string;
  profileImage: string;
  createdAt: Date;
  emailVerified: boolean;
  role: "USER" | "ADMIN";
  status: string;
  friends: string[];
  chatrooms: string[];
}

export type UserState = {
  user: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
};

export type ChatroomsState = {
  connectedChatrooms: string[];
  addConnectedChatroom: (roomId: string) => void;
  deleteConnectedChatroom: (roomId: string) => void;
};
