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

export interface ProfileInfoWithFile {
  username: string;
  userId: string;
  profileImage: Express.Multer.File;
}

export interface ImageType {
  secure_url: string;
  public_id: string;
}

export interface UpdateMeDto {
  username?: string;
  userId?: string;
  profileImage?: ImageType;
}
