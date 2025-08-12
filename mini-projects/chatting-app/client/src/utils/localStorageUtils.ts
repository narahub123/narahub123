// 로컬 스토리지에 accessToken 저장
export const saveLoginState = (accessToken: string) => {
  try {
    localStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.error("login 상태 저장 실패", error);
  }
};

// 로컬 스토리지에서 accessToken이 존재하는지 여부를 확인하는 함수
export const checkLoginState = (): boolean => {
  try {
    return Boolean(localStorage.getItem("accessToken"));
  } catch (error) {
    console.error("login 정보 호출 실패", error);
    return false;
  }
};

// 로컬 스토리지에서 accessToken 가져오기
export const getLoginState = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.log("토큰 가져오기 실패", error);
    return "";
  }
};

// 로컬 스토리지에서 accessToken 삭제
export const removeLoginState = () => {
  try {
    localStorage.removeItem("loggedIn");
  } catch (error) {
    console.error("login 정보 삭제 실패", error);
  }
};
