import {
  GITHUB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  KAKAO_CLIENT_ID,
  NAVER_CLIENT_ID,
} from "../constants";
import { github, google, kakao, naver } from "./images";

export const signupFieldList = [
  {
    field: "userId",
    label: "사용자 아이디",
  },
  {
    field: "username",
    label: "사용자 이름",
  },
  {
    field: "email",
    label: "이메일",
    type: "email",
  },
  {
    field: "password",
    label: "비밀번호",
    type: "password",
  },
  {
    field: "password_confirm",
    label: "비밀번호 확인",
    type: "password",
  },
];

// 타입 설정할 것
export const oauths = {
  google: {
    type: "google",
    logo: google,
    url: "https://accounts.google.com/o/oauth2/v2/auth",
    client_id: GOOGLE_CLIENT_ID,
    scope: "email+profile",
  },
  kakao: {
    type: "kakao",
    logo: kakao,
    url: "https://kauth.kakao.com/oauth/authorize",
    client_id: KAKAO_CLIENT_ID,
    scope: "account_email, profile_nickname, profile_image",
  },
  naver: {
    type: "naver",
    logo: naver,
    url: "",
    client_id: NAVER_CLIENT_ID,
    scope: "",
  },
  github: {
    type: "github",
    logo: github,
    url: "https://github.com/login/oauth/authorize",
    client_id: GITHUB_CLIENT_ID,
    scope: "user",
  },
};
