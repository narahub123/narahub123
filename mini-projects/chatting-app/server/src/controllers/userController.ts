import { Request, Response } from "express";
import { asyncWrapper } from "../utils";

export const getUserInfo = asyncWrapper(
  "getUserInfo",
  async (req: Request, res: Response) => {
    console.log(req.user);
    const { password, ...rest } = req.user;

    const userInfo = rest;

    res.status(200).json({
      success: true,
      message: "사용자 정보 조회 성공",
      code: "USER_INFO_RETRIEVAL_SUCCEEDED",
      data: {
        user: userInfo,
      },
    });
  }
);
