import { useEffect } from "react";
import { useLoginStore } from "../stores";
import { checkLoginState } from "../utils/localStorageUtils";

const useLoginCheck = () => {
  // 로그인 상태 감지 변경
  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);

  // 로그인 상태 확인
  useEffect(() => {
    const isLogggedIn = checkLoginState();

    setIsLoggedIn(isLogggedIn);
  }, [setIsLoggedIn]);
};

export default useLoginCheck;
