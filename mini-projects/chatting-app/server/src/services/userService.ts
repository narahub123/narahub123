import userRepository from "../repositories/userRepository";
import { SignupInfo } from "../types";

class UserService {
  async getUserByEmail(email: string) {
    const result = await userRepository.getUserByEmail(email);

    if (!result || result.empty) {
      throw new Error("Not Found");
    }

    return result;
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
}

export default new UserService();
