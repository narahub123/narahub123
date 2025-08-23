import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../configs";

export const signInWithGoogle = async () => {
  try {
    console.log("로그인 시도 중...");
    const result = await signInWithPopup(auth, provider);

    console.log("로그인 성공");
    console.log(result.user);
  } catch (error) {
    console.error("로그인 오류 발생", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 오류", error);
  }
};
