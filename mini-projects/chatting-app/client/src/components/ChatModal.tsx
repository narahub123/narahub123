import { FC, useEffect, useState } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useLoginStore, useOpenStore } from "../stores";
import { fetchWithAuth } from "../utils";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";
import { PageType } from "../types";

const ChatModal: FC = () => {
  const [curPage, setCurPage] = useState<PageType>("friends");
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
        <ChatSidebar setCurPage={setCurPage} />
        <ChatMain curPage={curPage} />
      </ModalContent>
    </Modal>
  );
};

export default ChatModal;
