export interface SignupInfo {
  userId: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface ProfileInfo {
  username: string;
  userId: string;
  profileImage: string;
}
