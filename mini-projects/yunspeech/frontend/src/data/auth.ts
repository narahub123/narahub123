import { GOOGLE_CLIENT_ID } from "../constants";

export const googleOauth = {
  type: "google",
  //   logo: google,
  url: "https://accounts.google.com/o/oauth2/v2/auth",
  client_id: GOOGLE_CLIENT_ID,
  scope: "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar",
  prompt: "consent",
  access_type: "offline",
};
