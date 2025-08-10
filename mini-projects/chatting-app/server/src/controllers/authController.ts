import { Request, Response } from "express";
import { userService } from "../services";

export const checkEmailDuplicate = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
      throw new Error("300 BadRequest");
    }

    const isDuplicate = await userService.checkEmailDuplicate(
      email?.toString()
    );

    console.log("isDuplicate", isDuplicate);

    res.status(200).json({ isDuplicate });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error });
  }
};
