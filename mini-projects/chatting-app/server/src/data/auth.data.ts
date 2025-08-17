import {
  GITHUB_CLIENT_ID,
  GITHUB_SECRET,
  GITHUB_TOKEN_URL,
  GITHUB_USERINFO_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  GOOGLE_TOKEN_URL,
  GOOGLE_USERINFO_URL,
  KAKAO_CLIENT_ID,
  KAKAO_SECRET,
  KAKAO_TOKEN_URL,
  KAKAO_USERINFO_URL,
} from "../constants";
import { OauthInfo, OauthType } from "../types";

export const oauths: Record<OauthType, OauthInfo> = {
  google: {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_SECRET,
    token_url: GOOGLE_TOKEN_URL,
    userInfo_url: GOOGLE_USERINFO_URL,
  },
  kakao: {
    client_id: KAKAO_CLIENT_ID,
    client_secret: KAKAO_SECRET,
    token_url: KAKAO_TOKEN_URL,
    userInfo_url: KAKAO_USERINFO_URL,
  },
  github: {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_SECRET,
    token_url: GITHUB_TOKEN_URL,
    userInfo_url: GITHUB_USERINFO_URL,
  },
};
