import { useOpenStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { Link, OauthButton, OauthButtonContainer } from "../components";
import { oauths } from "../data";
import { OauthType } from "../types";
import { SERVER_URL } from "../constants";

const SignupModal = () => {
  const isOpen = useOpenStore((state) => state.isSignupModalOpen);
  const setIsSignupModalOpen = useOpenStore(
    (state) => state.setIsSignupModalOpen
  );
  const setIsEmailSignupModalOpen = useOpenStore(
    (state) => state.setIsEmailSignupModalOpen
  );

  // 이메일 로그인 호출 함수
  const handleEmailSignup = () => {
    // signup 모달 닫기
    setIsSignupModalOpen(false);
    // email 회원가입 모달 열기
    setIsEmailSignupModalOpen(true);
  };

  // 로그인 모달 호출 함수
  const handleLogin = () => {
    // 회원가입 모달 닫기
    setIsSignupModalOpen(false);
    // 로그인 모달 열기
  };

  // 회원가입 취소 함수
  const handleSignupCancel = () => {
    // 회원가입 모달 닫기
    setIsSignupModalOpen(false);
  };

  return (
    <Modal open={isOpen}>
      <ModalContent
        className="space-y-8"
        onCloseIconClicked={handleSignupCancel}
      >
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold">환영합니다!</h2>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="">
            {/* 이메일 회원가입 모달창 열림 */}
            <Button onClick={handleEmailSignup}>이메일 회원가입</Button>
          </div>
          {/* 각 소셜 로그인 프로세스 진행 */}
          <OauthButtonContainer />
        </div>
        <div className="flex justify-center gap-2">
          <h2 className="font-bold">이미 계정이 있으신가요?</h2>
          <Link text="로그인하러가기" onClick={handleLogin} />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
