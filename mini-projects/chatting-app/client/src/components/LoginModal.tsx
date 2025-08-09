import { useOpenStore, useAuthStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { Input, Link, OauthButtonContainer } from "../components";
import { loginList } from "../data";

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

  // 입력된 회원정보 삭제 함수
  const cleanLoginInfo = useAuthStore((state) => state.cleanLoginInfo);

  // 사용자 입력 정보
  const loginInfo = useAuthStore((state) => state.login);

  // 로그인 정보 업데이트 함수
  const setLoginInfo = useAuthStore((state) => state.setLoginInfo);

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
  };

  // 로그인 정보 입력
  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setLoginInfo(id, value);
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
              <Button className="w-full">로그인</Button>
            </div>
            <hr className="w-full" />
            {/* 각 소셜 로그인 프로세스 진행 */}
            <OauthButtonContainer />
          </div>
          <hr className="w-full" />
          <div className="flex justify-center gap-2">
            <p>계정이 없으신가요?</p>
            <Link text="회원가입하러가기" onClick={handleSignup} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
