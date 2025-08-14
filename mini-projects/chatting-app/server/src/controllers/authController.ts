import { NextFunction, Request, Response } from "express";
import { userService, userSessionService } from "../services";
import { asyncWrapper, jwtSignP } from "../utils";
import { plainToInstance } from "class-transformer";
import {
  EmailCheckRequest,
  LoginCheckRequest,
  SignupCheckRequest,
} from "../dtos/request/userRequest";
import { validate } from "class-validator";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
} from "../errors";
import { OauthType } from "../types";
import { oauths } from "../data";
import { OAUTH_GRANT_TYPE, OAUTH_REDIRECT_URI } from "../constants";

export const checkEmailDuplicate = asyncWrapper(
  "checkEmailDuplicate",
  async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(EmailCheckRequest, req.query);

    const errors = await validate(dto);

    if (errors.length > 0) {
      const message = errors
        .map((err) => Object.values(err.constraints || {}).join(", "))
        .join("; ");

      return next(new BadRequestError(message));
    }

    const isDuplicate = await userService.checkEmailDuplicate(dto.email);

    res.status(200).json({
      success: true,
      code: "EMAIL_DUPLICATION_CHECK_SUCCEEDED",
      message: "이메일 중복 검사 성공",
      timestamp: new Date().toISOString(),
      data: {
        isDuplicate,
      },
    });
  }
);

export const signup = asyncWrapper(
  "signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(SignupCheckRequest, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      const message = errors
        .map((err) => Object.values(err.constraints || {}).join(", "))
        .join("; ");

      return next(new BadRequestError(message));
    }

    const signupInfo = {
      userId: dto.userId,
      username: dto.username,
      email: dto.email,
      password: dto.password, // 해싱 필요
      profileImage: "", // 이미지 업로드 후 url 사용해야 함
    };

    await userService.createUser(signupInfo);

    res.status(201).json({
      success: true,
      code: "EMAIL_SIGNUP_SUCCEEDED",
      message: "회원 가입 성공",
      timestamp: new Date().toISOString(),
    });
  }
);

export const login = asyncWrapper(
  "login",
  async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(LoginCheckRequest, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      const message = errors
        .map((err) => Object.values(err.constraints || {}).join(", "))
        .join("; ");

      return next(new BadRequestError(message));
    }

    // 사용자 정보 가져오기
    const user = (await userService.login(dto)).docs[0].data();

    const payload = {
      userId: user.userId,
      email: user.email,
    };

    const accessToken = await jwtSignP(payload, "10m");
    const refreshToken = await jwtSignP(payload, "1h");

    // 사용자 세션 생성
    const sessionId = await userSessionService.createUserSession(
      user.userId,
      refreshToken
    );

    // 응답
    res.status(200).json({
      success: true,
      code: "LOGIN_SUCCEEDED",
      message: "로그인 성공",
      timestamp: new Date().toISOString(),
      data: {
        accessToken,
        sessionId,
      },
    });
  }
);

export const oauth = asyncWrapper(
  "oauth",
  async (req: Request, res: Response) => {
    const { state, code } = req.query;

    // state나 code가 없는 경우 에러 핸들링 추가할 것!!
    if (!state || !code) return;

    // state를 통한 oauth 타입 확인
    const oauthType = state.toString() as OauthType;

    const { client_id, client_secret, token_url, userInfo_url } =
      oauths[oauthType];

    console.log(client_id, client_secret, token_url, userInfo_url);

    const requestBody = {
      code: code as string, // 인증 코드
      client_id: client_id,
      client_secret: client_secret || "",
      redirect_uri: OAUTH_REDIRECT_URI,
      grant_type: OAUTH_GRANT_TYPE,
    };

    // 토큰 요청
    try {
      const response = await fetch(token_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams(requestBody).toString(),
      });

      if (!response.ok) {
        const errorText = await response.text(); // 응답 본문을 텍스트로 가져오기
        console.error(`Error: ${response.status}, ${errorText}`);
        throw new ForbiddenError(
          "Oauth 액세스 토큰 취득 실패",
          "ACCESS_TOKEN_RETRIEVAL_FAILED"
        );
      }

      const result = await response.json();

      console.log(result);

      const access_token = result.access_token;

      try {
        const response = await fetch(userInfo_url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // 응답 본문을 텍스트로 가져오기
          console.error(`Error: ${response.status}, ${errorText}`);

          throw new InternalServerError(
            "사용자 정보 취득 실패",
            "OAUTH_USER_INFO_RETRIVAL_FAILED"
          );
        }

        // Oauth에서 얻은 사용자 정보
        const result = await response.json();

        let oauthUserInfo: {
          email: string;
          username: string;
          profileImage: string;
        } = { email: "", username: "", profileImage: "" };

        console.log("사용자 정보", result);

        if (state.toString() === "google") {
          oauthUserInfo = {
            email: result.email,
            username: result.name,
            profileImage: result.picture,
          };
        } else if (state.toString() === "kakao") {
          oauthUserInfo = {
            email: result.kakao_account.email,
            username: result.properties.nickname,
            profileImage: result.properties.profile_image,
          };
        } else if (state.toString() === "github") {
          oauthUserInfo = {
            email: "",
            username: result.name,
            profileImage: result.avatar_url,
          };
        }

        console.log(oauthUserInfo);

        // DB에서 얻은 사용자 정보
        const isExisting = await userService.checkUserExistence(
          oauthUserInfo.email
        );

        console.log(isExisting);

        // 기존 사용자인 경우: 로그인
        if (isExisting) {
          console.log("로그인 성공 ");

          return res.redirect(
            "http://localhost:3000/narahub123/chatting-app/callback/oauth?login=true"
          );
        } else {
          console.log("로그인 실패");
          // 기존 사용자가 아닌 경우 : 회원 가입
          return res.redirect(
            `http://localhost:3000/narahub123/chatting-app/callback/oauth?login=false&email=${oauthUserInfo.email}&username=${oauthUserInfo.username}&profileImage=${oauthUserInfo.profileImage}`
          );
        }
      } catch (err) {}
    } catch (err) {}
  }
);
