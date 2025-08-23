import dotenv from "dotenv";
dotenv.config();

// oauths
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET_PASSWORD || "";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_USERINFO_URL =
  "https://www.googleapis.com/calendar/v3/users/me/calendarList";

export const OAUTH_REDIRECT_URI = "http://localhost:3302/auth/oauth";
export const OAUTH_GRANT_TYPE = "authorization_code";
