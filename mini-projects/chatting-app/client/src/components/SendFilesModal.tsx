import { useOpenStore } from "../stores";
import { Modal, ModalContent } from "../theme/daisyui";

const SendFilesModal = () => {
  const isSendFilesModalOpen = useOpenStore(
    (state) => state.isSendFilesModalOpen
  );

  const setIsSendFilesModalOpen = useOpenStore(
    (state) => state.setIsSendFilesModalOpen
  );

  const onClose = () => {
    setIsSendFilesModalOpen(false);
  };

  return (
    <Modal open={isSendFilesModalOpen}>
      <ModalContent onCloseIconClicked={onClose}>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">파일 전송</h2>
          </div>
          <div>파일들</div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SendFilesModal;
