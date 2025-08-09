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
};

export type SignupUserType = {
  userId: string; // 유저 아이디
  username: string; // 유저 이름
  email: string; // 이메일
  password: string; // 비밀번호
  password_confirm: string; // 비밀번호 확인
  profile_image: ImageType | null; // 프로필 사진
};

export type SignupState = {
  user: SignupUserType; // 회원가입 사용자 정보
  canSend: boolean; // 회원가입 버튼 유효성 통과 여부 상태
  setProfileImage: (profileImage: ImageType) => void; // 이미지 변경
  cleanSignupUser: () => void; // 회원가입 사용자 정보 삭제
  setUserInfo: (id: string, value: string) => void;
  setCanSend: (canSend: boolean) => void;
};
