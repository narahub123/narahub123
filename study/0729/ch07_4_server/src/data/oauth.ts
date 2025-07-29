export const oauthObj = {
  google: {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
    client_secret: process.env.REACT_APP_GOOGLE_SECRET || "",
    token: "https://oauth2.googleapis.com/token",
    userInfo: "https://www.googleapis.com/userinfo/v2/me",
  },
  kakao: {
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID || "",
    client_secret: process.env.REACT_APP_GOOGLE_SECRET || "",
    token: "https://kauth.kakao.com/oauth/token",
    userInfo: "https://kapi.kakao.com/v2/user/me",
  },
  github: {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID || "",
    client_secret: process.env.REACT_APP_GITHUB_SECRET || "",
    token: "https://github.com/login/oauth/access_token",
    userInfo: "https://api.github.com/user",
  },
};
