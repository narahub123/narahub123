import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import { asyncWrapper } from "../utils";
import { plainToInstance } from "class-transformer";
import { EmailCheckRequest } from "../dtos/request/userRequest";
import { validate } from "class-validator";
import { BadRequestError } from "../errors";

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
