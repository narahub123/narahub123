import { NotFoundError } from "../errors";
import userRepository from "../repositories/userRepository";
import { LoginInfo, SignupInfo } from "../types";

class UserService {
  async getUserByEmail(email: string) {
    const result = await userRepository.getUserByEmail(email);

    if (!result || result.empty) {
      throw new Error("Not Found");
    }

    return result.docs[0].data()!;
  }

  async getUserByEmailWithoutError(email: string) {
    const result = await userRepository.getUserByEmail(email);

    return result.empty ? null : result.docs[0].data()!;
  }

  // 이메일 중복 여부 검사
  async checkEmailDuplicate(email: string): Promise<boolean> {
    const result = await userRepository.getUserByEmail(email);

    // 중복여부 반환: empty이면 false, empty가 아니면 true
    return !result.empty;
  }

  async createUser(signupInfo: SignupInfo) {
    // 이메일 중복 검사

    // userId 중복 검사

    await userRepository.createUser(signupInfo);
  }

  async login(loginInfo: LoginInfo) {
    // 이메일 중복 검사

    // 비밀번호 비교?

    const user = await userRepository.login(loginInfo);

    if (user.empty) {
      throw new NotFoundError("사용자 없음", "USER_NOT_FOUND");
    }

    return user;
  }

  async updateUserChatrooms(email: string, roomId: string) {
    await userRepository.updateUserChatrooms(email, roomId);
  }
}

export default new UserService();
