import { NextFunction, Request, Response } from "express";
import { userService, userSessionService } from "../services";
import { jwtSignP, jwtVerifyP, sendLogoutResponse } from "../utils";
import { IUser } from "../dtos";

export const authTokenVerifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  const sessionId = req.headers[`x-session-id`] as string;

  // access token이 없는 경우 로그아웃
  if (!accessToken || !sessionId) {
    // 로그아웃
    sendLogoutResponse(res, "토큰 누락");
    return;
  }

  try {
    const { email } = await jwtVerifyP(accessToken);

    const user = (await userService.getUserByEmail(email)) as IUser;

    req.user = user;
    req.sessionId = sessionId;

    next();
  } catch (error) {
    // 프레시 토큰 만료 여부 확인
    try {
      const userSession = await userSessionService.fetchUserSessionById(
        sessionId
      );

      // 세션이 존재하지 않거나 데이터가 없은 경우
      if (!userSession.exists || !userSession.data()) {
        // 로그아웃
        sendLogoutResponse(res, "세션 없음");
        return;
      }

      const { refreshToken } = userSession.data()!;

      const { userId, email } = await jwtVerifyP(refreshToken);

      const accessToken = await jwtSignP({ userId, email }, "10m");

      // 프레시 토큰이 만료되지 않았으면 accessToken 재발급
      res.status(200).json({
        success: true,
        message: "access token 재발급",
        code: "ACCESS_TOKEN_REISSUED",
        timestamp: new Date().toISOString(),
        data: {
          accessToken,
          sessionId,
        },
      });
    } catch (error) {
      // 프레시 토큰이 만료된 경우 로그아웃
      // 세션 삭제
      await userSessionService.deleteUserSessionById(sessionId);

      // 로그아웃
      sendLogoutResponse(res, "리프레시 토큰 만료");
      return;
    }
  }
};
