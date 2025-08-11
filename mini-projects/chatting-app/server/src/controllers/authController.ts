import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import { asyncWrapper } from "../utils";
import { plainToInstance } from "class-transformer";
import {
  EmailCheckRequest,
  LoginCheckRequest,
  SignupCheckRequest,
} from "../dtos/request/userRequest";
import { validate } from "class-validator";
import { BadRequestError } from "../errors";
import { SignupInfo } from "../types";

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

    const user = await userService.login(dto);

    

    // userSession 등록 해야 함

    res.status(200).json({
      success: true,
      code: "LOGIN_SUCCEEDED",
      message: "로그인 성공",
      timestamp: new Date().toISOString(),
    });
  }
);
