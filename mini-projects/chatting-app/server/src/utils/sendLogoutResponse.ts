import { Response } from "express";

export const sendLogoutResponse = (res: Response, message: string) => {
  return res.status(401).json({
    success: false,
    message,
    code: "LOGOUT",
    timestamp: new Date().toISOString(),
  });
};
