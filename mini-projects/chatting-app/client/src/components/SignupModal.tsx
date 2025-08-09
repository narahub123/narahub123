import { useOpenStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";

const SignupModal = () => {
  const isOpen = useOpenStore((state) => state.isSignupModalOpen);

  return (
    <Modal open={isOpen}>
      <ModalContent className="space-y-8">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold">환영합니다!</h2>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="">
            {/* 이메일 회원가입 모달창 열림 */}
            <Button>이메일 회원가입</Button>
          </div>
          <div className="space-x-4">
            {/* 각 소셜 로그인 프로세스 진행 */}
            <Button>Google</Button>
            <Button>카카오</Button>
            <Button>네이버</Button>
            <Button>깃허브</Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
