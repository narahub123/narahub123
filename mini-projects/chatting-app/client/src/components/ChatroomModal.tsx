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
  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState("");

  const user = useUserStore((state) => state.user);

  // 채팅방 조회
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

  // 웹 소켓 처리
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3301?roomId=${roomId}`);

    setWebsocket(ws);

    ws.onopen = () => {
      console.log("WebSocket 연결됨");
    };

    ws.onmessage = (event) => {
      setIsLoading(false);
      let chatData = event.data;

      if (chatData === "connected") {
        // setConnection("접속 완료");
        return;
      }

      chatData = JSON.parse(chatData);

      console.log(chatData);
      // 메시지 전송
      if (chatData.type === "message") {
        const { type, ...chat } = chatData;
        // chat 추가
        setChats((prev) => [...prev, chat]);

        // 사용자의 마지막 읽은 메시지에 추가
        setChatroom((prev) => ({
          ...prev!,
          participants: prev!.participants.map((p) =>
            p.email === chat.sender
              ? {
                  ...p,
                  lastReadMessageId: chat.chatId,
                }
              : p
          ),
        }));
      } else if (chatData.type === "unread") {
        console.log(firstUnreadMessageId);

        // firstUnreadMessage 이후 메시지는 읽음 처리
        const firstUnreadMessageIndex = chats.findIndex(
          (chat) => chat.chatId === firstUnreadMessageId
        );

        console.log(firstUnreadMessageIndex);

        console.log("챗들", chats);

        const readChats = chats.slice(0, firstUnreadMessageIndex);
        console.log("읽은 애들", chats);

        // 안 읽은 챗은 email이 아닌 해당 email의 createdAt보다 이후의 애들만 골라야 함
        // createdAt를 기준으로 이후 것들만 남길 것
        const unreadChats =
          firstUnreadMessageIndex === -1
            ? []
            : chats.slice(firstUnreadMessageIndex).map((chat) => ({
                ...chat,
                unread: chat.unread.filter((p) => p !== user?.email),
              }));

        console.log("안 읽은 애들", chats);

        const updatedChats = [...readChats, ...unreadChats];

        console.log(updatedChats);

        setChats(updatedChats);
        // 마지막 읽은 메시지 아이디 변경
        setChatroom((prev) => ({
          ...prev!,
          participants: prev!.participants.map((p) => {
            console.log(chats);
            console.log(updatedChats);

            return {
              ...p,
              lastReadMessageId:
                p.email === user?.email
                  ? updatedChats[updatedChats.length - 1].chatId
                  : p.lastReadMessageId,
            };
          }),
        }));
      }
    };

    ws.onclose = () => {
      console.log("접속 종료");
    };
  }, [chats, firstUnreadMessageId]);

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
    firstUnreadMessageId,
    setFirstUnreadMessageId,
  };

  return isOpen && user && chatroom ? (
    <ChatroomProvider value={context}>
      <Modal open={isOpen}>
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
