import { chatIcon, defaultProfile } from "./images";

export const auths = [
  { id: "signup", text: "회원가입" },
  { id: "login", text: "로그인" },
];

export const sidebars = [
  {
    type: "friends",
    src: defaultProfile,
    alt: "친구 목록",
  },
  {
    type: "chats",
    src: chatIcon,
    alt: "대화 목록",
  },
];

export const windowControllers = [
  {
    name: "horizontal_rule",
    title: "최소화",
    id: "minimize",
  },
  {
    name: "square",
    title: "최대화",
    id: "maximize",
  },
  {
    name: "close",
    title: "닫기",
    id: "close",
  },
];
