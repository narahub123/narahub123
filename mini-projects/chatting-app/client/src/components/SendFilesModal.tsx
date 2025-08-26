import { FC } from "react";
import { useFilesStore, useOpenStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { Icon } from "../components";
import { UserInfo } from "../types";
import { calculateFileSize } from "../utils";

interface SendFilesModalProps {
  roomId: string;
  websocket: WebSocket;
  user: UserInfo;
}

const SendFilesModal: FC<SendFilesModalProps> = ({
  roomId,
  websocket,
  user,
}) => {
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

  const handleSend = () => {
    if (files.length === 0) return;

    const msg = {
      type: "file",
      roomId,
      email: user.email,
      files: files.map((f) => {
        if (f.type === "file") {
          return {
            file: f.file,
            type: f.type,
            name: f.name,
            size: f.size,
          };
        } else {
          return {
            file: f.file,
            type: f.type,
          };
        }
      }),
    };

    websocket.send(JSON.stringify(msg));
    clearFiles();
  };

  return (
    <Modal open={isSendFilesModalOpen}>
      <ModalContent onCloseIconClicked={onClose} className="w-[400px]">
        <div className="space-y-8">
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
                        <p>{calculateFileSize(file.size)}</p>
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
                        <p>{calculateFileSize(file.size)}</p>
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
                  <div className="flex items-center gap-4" key={index}>
                    <span>
                      <Icon name="folder_zip" className="text-2xl" />
                    </span>
                    <span>
                      <p>{file.name}</p>
                      <p>{calculateFileSize(file.size)}</p>
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex justify-center">
            <Button
              className="w-full btn-primary"
              disabled={files.length === 0}
              onClick={handleSend}
            >
              파일 전송
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SendFilesModal;
