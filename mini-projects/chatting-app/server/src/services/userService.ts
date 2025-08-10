import userRepository from "../repositories/userRepository";

class UserService {
  async getUserByEmail(email: string) {
    const result = await userRepository.getUserByEmail(email);

    if (!result || result.empty) {
      throw new Error("Not Found");
    }

    return result;
  }

  async checkEmailDuplicate(email: string) {
    const result = await userRepository.getUserByEmail(email);

    if (!result || result.empty) {
      return false;
    }

    return true;
  }
}

export default new UserService();
