import { SERVER_URL } from "../constants";
import { checkLoginState, removeLoginState } from "../utils";

const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  body: any = null
) => {
  const isLogggedIn = checkLoginState();

  if (!isLogggedIn) throw new Error("로그인이 필요합니다.");

  const makeRquest = async (body: any = null) => {
    let response = await fetch(`${SERVER_URL}${url}`, {
      ...options,
      // body가 있으면 POST 없으면 options.method를 따르거나 없으면 GET
      method: options.method ? options.method : body ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : null,
    });

    return response.json();
  };

  let result = await makeRquest(body);

  if (result.success && result.code === "ACCESS_TOKEN_REISSUED") {
    const newAccessToken = result.data?.accessToken;

    if (!newAccessToken) {
      throw new Error("토큰 재발급 실패");
    }

    localStorage.setItem("accessToken", newAccessToken);

    result = await makeRquest(body);
  }

  if (!result.success && result.code === "LOGOUT") {
    removeLoginState();
  }

  return result;
};

export default fetchWithAuth;
