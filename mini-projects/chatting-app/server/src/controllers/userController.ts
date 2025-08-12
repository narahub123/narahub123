import { Request, Response } from "express";
import { asyncWrapper } from "../utils";

export const getUserInfo = asyncWrapper(
  "getUserInfo",
  async (req: Request, res: Response) => {
    console.log(req.cookies);
  }
);
