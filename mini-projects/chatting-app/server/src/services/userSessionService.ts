import { userSessionRepository } from "../repositories";

class UserSessionService {
  async createUserSession(userId: string, refreshToken: string): Promise<void> {
    await userSessionRepository.createUserSession(userId, refreshToken);
  }
}

export default new UserSessionService();
