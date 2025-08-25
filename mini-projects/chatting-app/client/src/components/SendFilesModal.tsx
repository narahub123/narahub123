import { useFilesStore, useOpenStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import Icon from "./Icon";

const SendFilesModal = () => {
  const isSendFilesModalOpen = useOpenStore(
    (state) => state.isSendFilesModalOpen
  );

  const setIsSendFilesModalOpen = useOpenStore(
    (state) => state.setIsSendFilesModalOpen
  );

  const files = useFilesStore((state) => state.files);

  const clearFiles = useFilesStore((state) => state.clearFiles);

  const deleteFile = useFilesStore((state) => state.deleteFile);

  const onClose = () => {
    setIsSendFilesModalOpen(false);
    clearFiles();
  };

  const handleDeleteFile = (index: number) => {
    deleteFile(index);
  };

  return (
    <Modal open={isSendFilesModalOpen}>
      <ModalContent onCloseIconClicked={onClose} className="w-[400px]">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">파일 전송</h2>
          </div>
          <div className="space-y-2">
            {files.map((file, index) => {
              if (file.type === "image") {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <span className="flex items-center gap-2">
                      <span>
                        <img src={file.preview} style={{ width: 50 }} />
                      </span>
                      <span>
                        <p>{file.name}</p>
                        <p>{file.size}</p>
                      </span>
                    </span>
                    <span>
                      <Button
                        className="text-white btn btn-error"
                        onClick={() => handleDeleteFile(index)}
                      >
                        <Icon name="delete" />
                      </Button>
                    </span>
                  </div>
                );
              } else if (file.type === "video") {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <span className="flex items-center gap-2">
                      <span>
                        <video src={file.preview} />
                      </span>
                      <span>
                        <p>{file.name}</p>
                        <p>{file.size}</p>
                      </span>
                    </span>
                    <span>
                      <Button>
                        <Icon name="delete" />
                      </Button>
                    </span>
                  </div>
                );
              } else {
                return (
                  <div className="flex items-center gap-2" key={index}>
                    <span>
                      <p>file</p>
                    </span>
                    <span>
                      <p>{file.name}</p>
                      <p>{file.size}</p>
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <div>
            <Button>파일 전송</Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SendFilesModal;
