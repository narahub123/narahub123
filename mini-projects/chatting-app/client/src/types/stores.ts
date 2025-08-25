import { ChatroomLastMessage, ImageType } from "./components";

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
  isOpenChatroomListModalOpen: boolean;
  setIsOpenChatroomListModalOpen: (
    isOpenChatroomListModalOpen: boolean
  ) => void;
  isChatroomJoinModalOpen: boolean;
  setIsChatroomJoinModalOpen: (isChatroomJoinModalOpen: boolean) => void;
  isChatroomSettingOpen: boolean;
  setIsChatroomSettingOpen: (isChatroomSettingOpen: boolean) => void;
  isMoreDropdownOpen: boolean;
  setIsMoreDropdownOpen: (isChatroomSettingOpen: boolean) => void;
  isToastOpen: boolean;
  setIsToastOpen: (isToastOpen: boolean) => void;
  isUserProfileModalOpen: boolean;
  setIsUserProfileModalOpen: (isUserProfileModalOpen: boolean) => void;
  isCheckPasswordModalOpen: boolean;
  setIsCheckPasswordModalOpen: (isCheckPasswordModalOpen: boolean) => void;
  isSendFilesModalOpen: boolean;
  setIsSendFilesModalOpen: (isSendFilesModalOpen: boolean) => void;
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
  clearSignupInfo: () => void; // 회원가입 사용자 정보 삭제
  canSend: boolean; // 회원가입 버튼 유효성 통과 여부 상태
  setCanSend: (canSend: boolean) => void;
  login: LoginInfoType;
  setLoginInfo: (id: string, value: string) => void;
  clearLoginInfo: () => void;
};

export interface UserInfo {
  email: string;
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
  addChatroom: (roomId: string) => void;
  deleteChatroom: (roomId: string) => void;
};

export type ChatroomsState = {
  // 연결된 채팅방 목록
  connectedChatrooms: string[];
  addConnectedChatroom: (roomId: string) => void;
  deleteConnectedChatroom: (roomId: string) => void;
  // 연결된 채팅방 비우기
  clearConnectedChatrooms: () => void;
  // 오픈 채팅방 목록
  openChatrooms: IChatroom[];
  setOpenChatrooms: (openChatrooms: IChatroom[]) => void;
  // 채팅방 가입
  joinChatroom: string;
  setJoinChatroom: (roomId: string) => void;
};

export interface ChatroomUserInfo {
  email: string;
  username: string;
  profileImage: string;
  joinedAt: Date;
  lastEnteredAt: Date;
  lastReadMessageId?: string;
}

export interface IChatroom {
  roomId: string;
  roomTitle: string;
  roomIntro: string;
  roomCapacity: number;
  roomProfileImage: string;
  roomCoverImage: string;
  creator: string;
  participants: ChatroomUserInfo[];
  roomType: "group" | "private";
  isSecret: boolean;
  roomPassword?: string;
  createdAt: Date;
  lastMessage: ChatroomLastMessage;
}

export interface ToastType {
  type: "error" | "success";
  message: string;
}

export type ToastStore = {
  toast?: ToastType;
  setToast: (toast: ToastType) => void;
  clearToast: () => void;
};
