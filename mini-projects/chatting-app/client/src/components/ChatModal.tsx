import { FC } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useOpenStore } from "../stores";

const ChatModal: FC = () => {
  const isChatModalOpen = useOpenStore((state) => state.isChatModalOpen);
  return (
    <Modal open={isChatModalOpen}>
      <ModalContent>채팅창</ModalContent>
    </Modal>
  );
};

export default ChatModal;
