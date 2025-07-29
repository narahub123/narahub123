import { Request } from "express";
import * as U from "../utils";

export const getUserIdFromJwtP = (req: Request) =>
  new Promise<string>(async (resolve, reject) => {
    const { authorization } = req.headers || [];

    console.log(authorization);

    if (!authorization) {
      reject(new Error("JSON 토큰이 없습니다."));
      return;
    }

    try {
      const tmp = authorization.split(" ");

      if (tmp.length !== 2)
        reject(new Error("헤데에서 JSON 토큰을 찾을 수 없습니다"));
      else {
        const jwt = tmp[1];
        const decoded = (await U.jwtVerifyP(jwt)) as { userId: string };

        console.log("decoded", decoded);

        resolve(decoded.userId);
      }
    } catch (e) {
      if (e instanceof Error) reject(new Error(e.message));
    }
  });
