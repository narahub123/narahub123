import { FC } from "react";
import {
  ChatroomList,
  FriendList,
  Icon,
  NotificationList,
  WindowControlButtonsContainer,
} from "../components";
import { windowControllers } from "../data";
import { useLoginStore, useOpenStore } from "../stores";
import { removeLoginState } from "../utils";
import { PageType } from "../types";

interface ChatMainProps {
  curPage: PageType;
}

const ChatMain: FC<ChatMainProps> = ({ curPage }) => {
  const setIsChatModalOpen = useOpenStore((state) => state.setIsChatModalOpen);
  const setIsLogggedIn = useLoginStore((state) => state.setIsLoggedIn);

  const handleLogout = () => {
    removeLoginState();
    setIsLogggedIn(false);
    setIsChatModalOpen(false);
  };

  const handleClose = () => {
    setIsChatModalOpen(false);
  };

  return (
    <main className="flex flex-col flex-1">
      <div className="flex justify-end">
        <WindowControlButtonsContainer
          onClose={handleClose}
          onMaximize={() => {}}
          onMinimize={() => {}}
        />
      </div>
      {curPage === "friends" ? (
        <FriendList />
      ) : curPage === "chats" ? (
        <ChatroomList />
      ) : (
        <NotificationList />
      )}
    </main>
  );
};

export default ChatMain;
