import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "vary important";

// oauths
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET || "";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_USERINFO_URL = "https://www.googleapis.com/userinfo/v2/me";

export const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID || "";
export const KAKAO_SECRET = process.env.KAKAO_SECRET || "";
export const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
export const KAKAO_USERINFO_URL = "https://kapi.kakao.com/v2/user/me";

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
export const GITHUB_SECRET = process.env.GITHUB_SECRET || "";
export const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
export const GITHUB_USERINFO_URL = "https://api.github.com/user";

export const OAUTH_REDIRECT_URI = "http://localhost:3301/auth/oauth";
export const OAUTH_GRANT_TYPE = "authorization_code";
