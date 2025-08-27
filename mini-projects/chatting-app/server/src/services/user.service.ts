import { ConflictError, NotFoundError } from "../errors";
import { userRepository } from "../repositories";

import {
  LoginInfo,
  ProfileInfo,
  ProfileInfoWithFile,
  SignupInfo,
} from "../types";
import { deleteFile, upload } from "../utils";

class UserService {
  async getUserByEmail(email: string) {
    const result = await userRepository.getUserByEmail(email);

    if (!result || !result.exists) {
      throw new Error("Not Found");
    }

    return result.data()!;
  }

  async getUserByEmailWithoutError(email: string) {
    const result = await userRepository.getUserByEmail(email);

    return result.exists ? result.data()! : null;
  }

  // 이메일 중복 여부 검사
  async checkEmailDuplicate(email: string): Promise<boolean> {
    const result = await userRepository.getUserByEmail(email);

    // 중복여부 반환: empty이면 false, empty가 아니면 true
    return result.exists;
  }

  async createUser(signupInfo: SignupInfo) {
    // 이메일 중복 검사

    // userId 중복 검사

    await userRepository.createUser(signupInfo);
  }

  async login(loginInfo: LoginInfo) {
    const user = await userRepository.login(loginInfo);

    if (user.empty) {
      throw new NotFoundError("사용자 없음", "USER_NOT_FOUND");
    }

    // 사용자 status 업데이트
    await userRepository.updateMe(loginInfo.email, { status: "ONLINE" });

    return user;
  }

  // 가입 여부 확인
  async hasUserJoinedRoom(email: string, roomId: string) {
    // 사용자 정보 가져오기
    const user = await this.getUserByEmail(email);

    return (user.chatrooms as string[])?.includes(roomId) ?? false;
  }

  // 채팅방 가입
  async updateUserChatrooms(email: string, roomId: string) {
    // 채팅방 가입 여부 확인
    const hasJoined = await this.hasUserJoinedRoom(email, roomId);

    if (hasJoined) {
      throw new ConflictError("이미 가입된 채팅방", "DUPLICATE_ROOMID");
    }

    await userRepository.updateUserChatrooms(email, roomId);
  }

  // 채팅방 탈퇴
  async leaveChatroom(email: string, roomId: string) {
    await userRepository.leaveChatroom(email, roomId);
  }

  // 사용자 프로필 업데이트
  async updateMe(email: string, profile: ProfileInfoWithFile) {
    try {
      console.log(email);
      const { profileImage, ...rest } = profile;

      const newProfile = {
        ...rest,
      } as Record<string, any>;

      if (profileImage) {
        // 기존 이미지 유무 확인
        const user = await this.getUserByEmail(email);
        const public_id = user.profileImage.public_id;

        if (public_id) {
          // 기존 이미지 삭제
          await deleteFile(public_id);
          console.log("삭제 성공");
        }

        // 이미지 업로드
        const result = await upload(profileImage);

        if (result) {
          newProfile["profileImage"] = result;
        }
      }

      await userRepository.updateMe(email, newProfile);

      return newProfile["profileImage"]?.secure_url || null;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
