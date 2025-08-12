// 로컬 스토리지에 로그인 상태 저장
export const saveLoginState = (accessToken: string) => {
  try {
    localStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.error("login 상태 저장 실패", error);
  }
};

// 로컬 스토리지에서 loggedIn이 존재하는지 여부를 확인하는 함수
export const checkLoginState = (): boolean => {
  try {
    return Boolean(localStorage.getItem("accessToken"));
  } catch (error) {
    console.error("login 정보 호출 실패", error);
    return false;
  }
};

// 로컬 스토리지에서 loggedIn 삭제
export const removeLoginState = () => {
  try {
    localStorage.removeItem("loggedIn");
  } catch (error) {
    console.error("login 정보 삭제 실패", error);
  }
};
