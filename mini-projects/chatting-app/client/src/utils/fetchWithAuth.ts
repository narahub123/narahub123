import { SERVER_URL } from "../constants";
import { getLoginState, removeLoginState, saveLoginState } from "../utils";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  body: any = null
) => {
  const { accessToken, sessionId } = getLoginState();

  if (!accessToken || !sessionId) {
    console.log("로그인 필요");

    return;
  }

  const makeRquest = async (body: any = null) => {
    let response = await fetch(`${SERVER_URL}${url}`, {
      ...options,
      // body가 있으면 POST 없으면 options.method를 따르거나 없으면 GET
      method: options.method ? options.method : body ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-session-id": sessionId,
        ...(options.headers || {}),
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : null,
    });

    return response.json();
  };

  let result = await makeRquest(body);

  if (result.success && result.code === "ACCESS_TOKEN_REISSUED") {
    const { accessToken, sessionId } = result.data!;
    if (!accessToken || !sessionId) {
      throw new Error("토큰 재발급 실패");
    }
    saveLoginState({ accessToken, sessionId });
    result = await makeRquest(body);
  }

  if (!result.success && result.code === "LOGOUT") {
    removeLoginState();
  }

  return result;
};
