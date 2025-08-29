import { useState } from "react";
import { Button, Modal, ModalContent } from "../../theme/daisyui";
import Input from "../Input";
import { useOpenStore } from "../../stores";

const CheckPasswordModal = () => {
  const [password, setPassword] = useState("");
  const isCheckPasswordModalOpen = useOpenStore(
    (state) => state.isCheckPasswordModalOpen
  );

  const setIsCheckPasswordModalOpen = useOpenStore(
    (state) => state.setIsCheckPasswordModalOpen
  );

  const onClose = () => {
    setIsCheckPasswordModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
  };

  return (
    <Modal open={isCheckPasswordModalOpen}>
      <ModalContent className="space-y-4" onCloseIconClicked={onClose}>
        <div className="flex justify-center">
          <p className="text-xl font-bold">비밀번호 확인</p>
        </div>
        <div>
          <Input
            type="password"
            entity={password}
            field="password"
            placeholder="현재 비밀번호를 작성해주세요."
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button className="btn btn-primary">비밀번호 확인</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default CheckPasswordModal;
