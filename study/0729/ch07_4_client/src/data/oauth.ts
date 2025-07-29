export const oauthObj = {
  google: {
    link: "https://accounts.google.com/o/oauth2/v2/auth",
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: "email+profile",
  },
  kakao: {
    link: "https://kauth.kakao.com/oauth/authorize",
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    scope: "account_email, profile_nickname, profile_image",
  },
  github: {
    link: "https://github.com/login/oauth/authorize",
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    scope: "user",
  },
};
