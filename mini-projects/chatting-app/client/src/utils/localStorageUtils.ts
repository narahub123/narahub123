export const saveLoginState = () => {
  try {
    localStorage.setItem("loggedIn", "true");
  } catch (error) {
    console.error("login 상태 저장 실패", error);
  }
};
