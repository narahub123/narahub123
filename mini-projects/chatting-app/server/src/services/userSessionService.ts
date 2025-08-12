import { NotFoundError } from "../errors";
import { userSessionRepository } from "../repositories";

class UserSessionService {
  async createUserSession(
    userId: string,
    refreshToken: string
  ): Promise<string> {
    const sessionId = await userSessionRepository.createUserSession(
      userId,
      refreshToken
    );

    return sessionId;
  }

  async getUserSessionById(sessionId: string) {
    const result = await userSessionRepository.getUserSessionById(sessionId);

    if (!result.exists) {
      throw new NotFoundError("세션 없음", "SESSION_NOT_FOUND");
    }

    return result.data()!;
  }

  // 인증용
  async fetchUserSessionById(sessionId: string) {
    return await userSessionRepository.getUserSessionById(sessionId);
  }

  // 세션 삭제
  async deleteUserSessionById(sessionId: string) {
    await this.getUserSessionById(sessionId);

    await userSessionRepository.deleteUserSessionById(sessionId);
  }
}

export default new UserSessionService();
