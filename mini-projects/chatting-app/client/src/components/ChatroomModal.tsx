import { FC, useEffect, useRef, useState } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useUserStore } from "../stores/useUserStore";
import { ChatInfo, ChatroomInfo } from "../types";
import { fetchWithAuth } from "../utils";
import {
  WindowControlButtonsContainer,
  ChatroomSettings,
  ChatroomModalHeader,
  ChatroomModalBody,
  ChatroomModalFooter,
} from "../components";
import { ChatroomProvider } from "../contexts";
import { ChatroomContextType } from "../types/contexts";

interface ChatroomModalProps {
  roomId: string;
  isOpen?: boolean;
  onClose: (roomId: string) => void;
}

const ChatroomModal: FC<ChatroomModalProps> = ({
  roomId,
  isOpen = true,
  onClose,
}) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [chat, setChat] = useState("");
  const [chatroom, setChatroom] = useState<ChatroomInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const [menuRect, setMenuRect] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchChatroomData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWithAuth(`/chatrooms/${roomId}`);

        if (!response.success) {
          console.error("채팅방 정보 조회 실패");
          return;
        }

        const { chats, ...rest } = response.data.chatroom;

        setChats(chats);
        setChatroom(rest);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatroomData();
  }, []);

  useEffect(() => {
    const fetchChatroomData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWithAuth(`/chatrooms/${roomId}`);

        if (!response.success) {
          console.error("채팅방 정보 조회 실패");
          return;
        }

        const { chats, ...rest } = response.data.chatroom;

        setChats(chats);
        setChatroom(rest);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatroomData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3301?roomId=${roomId}`);

    setWebsocket(ws);

    ws.onopen = () => {
      console.log("WebSocket 연결됨");
    };

    ws.onmessage = (event) => {
      let chat = event.data;

      if (chat === "connected") {
        // setConnection("접속 완료");
        return;
      }

      chat = JSON.parse(chat);

      setChats((prev) => [...prev, chat]);
    };

    ws.onclose = () => {
      //   setConnection("접속 종료");
    };
  }, []);

  const context: ChatroomContextType = {
    chatroom: chatroom!,
    setChatroom,
    roomId,
    menuRect,
    setMenuRect,
    chat,
    setChat,
    isLoading,
    setIsLoading,
    chats,
    setChats,
    websocket,
    user,
  };

  return isOpen && !isLoading && user && chatroom ? (
    <ChatroomProvider value={context}>
      <Modal open={isOpen && !isLoading}>
        <ChatroomSettings rect={menuRect} roomId={roomId} />
        <ModalContent className="flex flex-col p-0 rounded-md bg-blue-50">
          <div className="flex justify-end flex-shrink-0 p-2 pb-0">
            <WindowControlButtonsContainer
              onClose={() => onClose(roomId)}
              onMaximize={() => {}}
              onMinimize={() => {}}
            />
          </div>
          {/* 헤더 */}
          <ChatroomModalHeader />
          {/* 바디 */}
          <ChatroomModalBody />
          {/* 푸터 */}
          <ChatroomModalFooter />
        </ModalContent>
      </Modal>
    </ChatroomProvider>
  ) : null;
};

export default ChatroomModal;
