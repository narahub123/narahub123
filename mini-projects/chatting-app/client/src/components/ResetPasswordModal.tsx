import { Button, Modal, ModalContent } from "../theme/daisyui";
import Input from "./Input";

const ResetPasswordModal = () => {
  return (
    <Modal open>
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
            entity={[]}
          />
        </div>
        <div className="flex justify-between">
          <Button className="text-white btn btn-error">취소</Button>
          <Button className="btn btn-primary">확인</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
