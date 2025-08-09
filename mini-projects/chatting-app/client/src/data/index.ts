export * from "./menus";

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
