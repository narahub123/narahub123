import { useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import Input from "./Input";

const CheckPasswordModal = () => {
  const [password, setPassword] = useState("");
  return (
    <Modal open>
      <ModalContent className="space-y-4">
        <div className="flex justify-center">
          <p className="text-xl font-bold">비밀번호 확인</p>
        </div>
        <div>
          <Input
            type="password"
            entity={password}
            field="password"
            placeholder="현재 비밀번호를 작성해주세요."
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
