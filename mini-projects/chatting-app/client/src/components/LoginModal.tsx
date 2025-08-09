import { useOpenStore, useAuthStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { Icon, Input, Link, OauthButtonContainer } from "../components";
import { loginList } from "../data";
import { useEffect, useState } from "react";

const LoginModal = () => {
  const [isCheck, setIsCheck] = useState(false);
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

  useEffect(() => {
    if (!loginInfo.email && !loginInfo.userId) return;

    const fields = Object.values(loginInfo).filter((field) => field);

    if (fields.length === 2) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }

    console.log(fields);
  }, [loginInfo.email, loginInfo.userId, loginInfo.password, loginInfo]);

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
  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setLoginInfo(id, value);
  };

  // 아이디 저장하기
  const handleCheck = () => {
    setIsCheck((prev) => !prev);
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
                  onChange={handleLogin}
                  entity={loginInfo}
                />
              ))}
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1" onClick={handleCheck}>
                  {isCheck ? (
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
                <Link text="이메일/비밀번호 찾기" onClick={() => {}} />
              </div>
              <Button className="w-full btn btn-primary" disabled={!canSend}>
                로그인
              </Button>
            </div>
            <hr className="w-full" />
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
