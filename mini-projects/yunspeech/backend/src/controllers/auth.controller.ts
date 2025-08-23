import { Request, Response } from "express";
import { googleOauth } from "../data";
import { OAUTH_GRANT_TYPE, OAUTH_REDIRECT_URI } from "../constants";

export const oauth = async (req: Request, res: Response) => {
  const { state, code } = req.query;

  console.log(state, code);

  // state나 code가 없는 경우 에러 핸들링 추가할 것!!
  if (!state || !code) return;

  const { client_id, client_secret, token_url, calendar_url } = googleOauth;

  console.log(client_id, client_secret, token_url, calendar_url);

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
      throw new Error("Oauth 액세스 토큰 취득 실패");
    }

    const result = await response.json();

    console.log(result);

    const access_token = result.access_token;

    // 캘린더 목록 조회
    try {
      const response = await fetch(calendar_url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // 응답 본문을 텍스트로 가져오기
        console.error(`Error: ${response.status}, ${errorText}`);

        throw new Error("사용자 정보 취득 실패");
      }

      // Oauth에서 얻은 사용자 정보
      const result = await response.json();

      console.log(result);

      let oauthUserInfo: {
        email: string;
        username: string;
        profileImage: string;
      } = { email: "", username: "", profileImage: "" };

      console.log("사용자 정보", result);

      oauthUserInfo = {
        email: result.email,
        username: result.name,
        profileImage: result.picture,
      };

      console.log(oauthUserInfo);

      // 기존 사용자인 경우: 로그인
      if (oauthUserInfo) {
        console.log("로그인 성공 ");
        const payload = {
          email: oauthUserInfo.email,
        };

        // const accessToken = await jwtSignP(payload, "10m");
        // const refreshToken = await jwtSignP(payload, "1h");

        // 사용자 세션 생성
        // const sessionId = await userSessionService.createUserSession(
        //   user.userId,
        //   refreshToken
        // );

        const accessToken = "";
        const sessionId = "";

        return res.redirect(
          `http://localhost:3000/admin/callback/oauth?login=true&accessToken=${accessToken}&sessionId=${sessionId}`
        );
      } else {
        console.log("로그인 실패");
        // 기존 사용자가 아닌 경우 : 회원 가입
        return res.redirect(
          `http://localhost:3000/admin/callback/oauth?login=false`
        );
      }
    } catch (err) {}
  } catch (err) {}
};
