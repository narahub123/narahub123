import {
  GITHUB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  KAKAO_CLIENT_ID,
  NAVER_CLIENT_ID,
} from "../constants";
import { OauthInfoType, OauthType } from "../types";
import { github, google, kakao, naver } from "./images";

export const signupFieldList = [
  {
    field: "userId",
    placeholder: "사용자 아이디",
  },
  {
    field: "username",
    placeholder: "사용자 이름",
  },
  {
    field: "email",
    placeholder: "이메일",
    type: "email",
  },
  {
    field: "password",
    placeholder: "비밀번호",
    type: "password",
  },
  {
    field: "password_confirm",
    placeholder: "비밀번호 확인",
    type: "password",
  },
];

export const loginList = [
  {
    field: "email",
    placeholder: "이메일",
  },
  {
    field: "password",
    placeholder: "비밀번호",
    type: "password",
  },
];

// 타입 설정할 것
export const oauths: Record<OauthType, OauthInfoType> = {
  google: {
    type: "google",
    logo: google,
    url: "https://accounts.google.com/o/oauth2/v2/auth",
    client_id: GOOGLE_CLIENT_ID,
    scope: "email+profile",
    prompt: "consent",
    access_type: "offline",
  },
  kakao: {
    type: "kakao",
    logo: kakao,
    url: "https://kauth.kakao.com/oauth/authorize",
    client_id: KAKAO_CLIENT_ID,
    scope: "account_email, profile_nickname, profile_image",
    prompt: "login",
  },
  naver: {
    type: "naver",
    logo: naver,
    url: "",
    client_id: NAVER_CLIENT_ID,
    scope: "",
    prompt: "consent",
  },
  github: {
    type: "github",
    logo: github,
    url: "https://github.com/login/oauth/authorize",
    client_id: GITHUB_CLIENT_ID,
    scope: "user",
    prompt: "consent",
  },
};
