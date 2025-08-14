import { useEffect } from "react";
import { useOpenStore, useAuthStore, useLoginStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { Icon, Input, Link, OauthButtonContainer } from "../components";
import { loginList } from "../data";
import { useLocalStorageCheck } from "../hooks";
import { SERVER_URL } from "../constants";
import { saveLoginState } from "../utils";

const LoginModal = () => {
  // 로그인 모달 여닫힘 상태
  const isOpen = useOpenStore((state) => state.isLoginModalOpen);
  // 로그인 모달 여닫힘 상태 변경 함수
  const setIsLoginModalOpen = useOpenStore(
    (state) => state.setIsLoginModalOpen
  );

  // 회원가입 모달 여닫기 상태 변경 함수
  const setIsSignupModalOpen = useOpenStore(
    (state) => state.setIsSignupModalOpen
  );

  // 비밀번호 재설정 여닫기 상태 변경 함수
  const setIsResetPasswordModal = useOpenStore(
    (state) => state.setIsResetPasswordModalOpen
  );

  // 입력된 회원정보 삭제 함수
  const cleanLoginInfo = useAuthStore((state) => state.cleanLoginInfo);

  // 사용자 입력 정보
  const loginInfo = useAuthStore((state) => state.login);

  // 로그인 정보 업데이트 함수
  const setLoginInfo = useAuthStore((state) => state.setLoginInfo);

  // 로그인 정보 전송 가능 여부 상태
  const canSend = useAuthStore((state) => state.canSend);

  // 로그인 정보 전송 가능 상태 변경 함수
  const setCanSend = useAuthStore((state) => state.setCanSend);

  // 로그인 상태 정보 변경 함수
  const setIsLoggedin = useLoginStore((state) => state.setIsLoggedIn);

  // chat 모달 여닫기 상태 변경 함수
  const setIsChatModalOpen = useOpenStore((state) => state.setIsChatModalOpen);

  // 이메일 회원가입 여닫기 상태 변경 함수
  const setIsEmailSignupModalOpen = useOpenStore(
    (state) => state.setIsEmailSignupModalOpen
  );

  const setSignupInfo = useAuthStore((state) => state.setSignupInfo);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      console.log("메시지", e.data.type);
      if (e.data.type === "oauth-success") {
        // 로그인 상태 로컬 스토리지에 저장
        saveLoginState(e.data.info);

        // 로그인 상태 변경
        setIsLoggedin(true);

        setIsLoginModalOpen(false);
        setIsChatModalOpen(true);
      } else if (e.data.type === "oauth-fail") {
        setIsLoginModalOpen(false);
        setIsEmailSignupModalOpen(true);

        Object.keys(e.data.info).forEach((key) => {
          setSignupInfo(key, e.data.info[key]);
        });
      }
    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
  }, []);

  // 입력값들의 유효성 결과
  useEffect(() => {
    if (!loginInfo.email && !loginInfo.userId) return;

    const fields = Object.values(loginInfo).filter((field) => field);

    if (fields.length === 2) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }

    console.log(fields);
  }, [
    loginInfo.email,
    loginInfo.userId,
    loginInfo.password,
    loginInfo,
    setCanSend,
  ]);

  const { savedEmail, setSavedEmail } = useLocalStorageCheck();

  // 회원가입으로 이동하기
  const handleSignup = () => {
    // 로그인 모달 닫기
    setIsLoginModalOpen(false);
    // 회원가입 모달 열기
    setIsSignupModalOpen(true);
  };

  // 로그인 취소하기
  const handleLoginCancel = () => {
    // 로그인 모달 닫기
    setIsLoginModalOpen(false);
    // 입력된 회원정보 삭제
    cleanLoginInfo();
    // canSend 초기화
    setCanSend(false);
  };

  // 로그인 정보 입력
  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setLoginInfo(id, value);
  };

  // 비밀번호 재설정 모달 열기
  const handleOpenResetPasswordModal = () => {
    // 로그인 모달 닫기
    setIsLoginModalOpen(false);
    // 비밀번호 재설정 모달 열기
    setIsResetPasswordModal(true);
  };

  // 아이디 저장하기
  const handleCheck = (email?: string) => {
    if (email === undefined) return;

    setSavedEmail(email);
  };

  // 로그인
  const handleLogin = async () => {
    const response = await fetch(`${SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    const result = await response.json();

    if (result.success) {
      // 로그인 상태 로컬 스토리지에 저장
      saveLoginState(result.data);

      // 로그인 상태 변경
      setIsLoggedin(true);

      // 로그인 모달 닫기
      setIsLoginModalOpen(false);

      // chat 모달 열기
      setIsChatModalOpen(true);
    }
  };
  console.log(loginInfo);

  return (
    <Modal open={isOpen}>
      <ModalContent
        className="space-y-8"
        onCloseIconClicked={handleLoginCancel}
      >
        <div className="flex justify-center">
          <h1 className="text-xl font-bold">다시 오셨군요?</h1>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <div className="space-y-4">
              {loginList.map((login) => (
                <Input
                  key={login.field}
                  field={login.field}
                  placeholder={login.placeholder}
                  type={login.type}
                  onChange={handleLoginInput}
                  entity={loginInfo}
                />
              ))}
              <div className="flex justify-between text-sm">
                <div
                  className="flex items-center gap-1"
                  onClick={() => handleCheck(savedEmail ? "" : loginInfo.email)}
                >
                  {savedEmail ? (
                    <Icon
                      name="check_box"
                      className="text-lg cursor-pointer select-none"
                    />
                  ) : (
                    <Icon
                      name="check_box_outline_blank"
                      className="text-lg cursor-pointer select-none"
                    />
                  )}
                  <label className="select-none">이메일 저장하기</label>
                </div>
                <Link
                  text="비밀번호 재설정"
                  onClick={handleOpenResetPasswordModal}
                />
              </div>
              <Button
                className="w-full btn btn-primary"
                disabled={!canSend}
                onClick={handleLogin}
              >
                로그인
              </Button>
            </div>
            {/* 각 소셜 로그인 프로세스 진행 */}
            <OauthButtonContainer />
          </div>
          <hr className="w-full" />
          <div className="flex justify-center gap-2 text-sm">
            <p>계정이 없으신가요?</p>
            <Link text="회원가입하러가기" onClick={handleSignup} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
