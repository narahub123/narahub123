import { useOpenStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import Input from "./Input";

const ResetPasswordModal = () => {
  // 비밀번호 재설정 모달 여닫기 상태
  const isOpen = useOpenStore((state) => state.isResetPasswordModalOpen);

  // 비밀번호 재설정 모달 여닫기 상태 변경 함수
  const setIsResetPasswordModalOpen = useOpenStore(
    (state) => state.setIsResetPasswordModalOpen
  );

  // 로그인 모달 여닫기 상태 변경 함수
  const setIsLoginModalOpen = useOpenStore(
    (state) => state.setIsLoginModalOpen
  );

  // 비밀번호 재설정 취소
  const handleResetPasswordCancel = () => {
    // 비밀번호 재설정 모달 닫기
    setIsResetPasswordModalOpen(false);
    // 로그인 모달 열기
    setIsLoginModalOpen(true);
  };

  return (
    <Modal open={isOpen}>
      <ModalContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">비밀번호 재설정</h2>
        </div>
        <div className="space-y-2">
          <p>비밀번호를 재설정할 계정의 이메일을 작성해주세요.</p>
          <Input
            field="email"
            placeholder="이메일"
            type="email"
            onChange={() => {}}
            entity={{}}
          />
        </div>
        <div className="flex justify-between">
          <Button
            className="text-white btn btn-error"
            onClick={handleResetPasswordCancel}
          >
            취소
          </Button>
          <Button className="btn btn-primary">확인</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
