import { useEffect, useState } from "react";
import { useAuthStore } from "../stores";

const useLocalStorageCheck = () => {
  const [savedEmail, setSavedEmail] = useState("");

  // 로그인 정보 상태 변경
  const setLoginInfo = useAuthStore((state) => state.setLoginInfo);

  // localStorage 확인하기
  useEffect(() => {
    // localStorage에서 savedEmail 가져오기
    const savedEmail = localStorage.getItem("savedEmail");

    // 존재하는 경우
    if (savedEmail) {
      // saveEmail 업데이트
      setSavedEmail(savedEmail);
      // loginInfo 업데이트
      setLoginInfo("email", savedEmail);
    }
  }, []);

  // isEmailSave 변경에 따른 localstorage 다루기
  useEffect(() => {
    // savedEmail이 존재하는 경우
    if (savedEmail) {
      // localStorage에 저장
      localStorage.setItem("savedEmail", savedEmail);
    } else {
      // 존재하지 않은 경우
      // localStorage에서 삭제
      localStorage.removeItem("savedEmail");
    }
  }, [savedEmail]);

  return { savedEmail, setSavedEmail };
};

export default useLocalStorageCheck;
