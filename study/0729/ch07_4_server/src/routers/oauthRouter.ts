import { Request, Response, Router } from "express";
import { MongoDB } from "../mongodb";
import dotenv from "dotenv";
import { oauthObj } from "../data/oauth";
dotenv.config();

export const oauthRouter = (...args: any[]) => {
  const db: MongoDB = args[0];

  const user = db.collection("user");

  const router = Router();

  return router.get("/", async (req: Request, res: Response) => {
    const { state, code } = req.query;

    const oauthType = state?.toString() as "google" | "kakao" | "github";

    const requestBody = {
      code: code as string,
      client_id: oauthObj[oauthType].client_id,
      client_secret: oauthObj[oauthType].client_secret,
      redirect_uri: "http://localhost:3002/oauth",
      grant_type: "authorization_code",
    };

    console.log(requestBody);

    console.log(oauthObj[oauthType].token);

    const response = await fetch(oauthObj[oauthType].token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams(requestBody).toString(),
    });

    console.log(response);

    // 응답이 실패했을 경우 에러 처리
    if (!response.ok) {
      const errorText = await response.text(); // 응답 본문을 텍스트로 가져오기
      console.error(`Error: ${response.status}, ${errorText}`);
      throw new Error("엑세스 토큰 취득 실패");
    }

    const resp = await response.json();

    console.log(resp);

    const access_token = resp.access_token;

    console.log(access_token);

    if (access_token) {
      const response = await fetch(
        oauthObj[oauthType].userInfo,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`, // Authorization 헤더에 Bearer 토큰 포함
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // 응답 본문을 텍스트로 가져오기
        console.error(`Error: ${response.status}, ${errorText}`);
      }

      const resp = await response.json();

      console.log(resp);

      const result = await user.findOne({ email: resp.email });

      if (result) {
        console.log("사용자");
      } else {
        console.log("비사용자");
        // res.json({ ok: false, errorMessage: "가입자가 아닙니다." });
        return res.redirect("http://localhost:3001/callback/oauth?login=false");
      }
    }
  });
};
