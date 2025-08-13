import { FC, useEffect } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useLoginStore, useOpenStore } from "../stores";
import { fetchWithAuth } from "../utils";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";

const ChatModal: FC = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const isChatModalOpen = useOpenStore((state) => state.isChatModalOpen);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUserData = async () => {
      const response = await fetchWithAuth("/users/me");

      if (!response.ok) {
        throw new Error("에러");
      }

      const data = await response.json();

      console.log(data);
    };

    fetchUserData();
  }, []);
  return (
    <Modal open={isChatModalOpen}>
      <ModalContent className="flex p-0 rounded-none">
        <ChatSidebar />
        <ChatMain />
      </ModalContent>
    </Modal>
  );
};

export default ChatModal;
