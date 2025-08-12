import { FC } from "react";
import { Modal, ModalContent } from "../theme/daisyui";

const ChatModal: FC = () => {
  return (
    <Modal open>
      <ModalContent>채팅창</ModalContent>
    </Modal>
  );
};

export default ChatModal;
