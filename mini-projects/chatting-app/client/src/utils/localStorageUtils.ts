import { AuthTokens } from "../types";

// 로컬 스토리지에 accessToken 저장
export const saveLoginState = (tokens: AuthTokens) => {
  try {
    localStorage.setItem("chatting", JSON.stringify(tokens));
  } catch (error) {
    console.error("login 상태 저장 실패", error);
  }
};

// 로컬 스토리지에서 accessToken이 존재하는지 여부를 확인하는 함수
export const checkLoginState = (): boolean => {
  try {
    return Boolean(localStorage.getItem("chatting"));
  } catch (error) {
    console.error("login 정보 호출 실패", error);
    return false;
  }
};

// 로컬 스토리지에서 accessToken 가져오기
export const getLoginState = () => {
  try {
    const data = localStorage.getItem("chatting");
    if (!data) {
      return "";
    }
    return JSON.parse(data);
  } catch (error) {
    console.log("토큰 가져오기 실패", error);
    return "";
  }
};

// 로컬 스토리지에서 accessToken 삭제
export const removeLoginState = () => {
  try {
    localStorage.removeItem("chatting");
  } catch (error) {
    console.error("login 정보 삭제 실패", error);
  }
};
