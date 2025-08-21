import { FC, useEffect, useRef, useState } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useUserStore } from "../stores/useUserStore";
import { ChatInfo, ChatroomInfo, IChatroom } from "../types";
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
        // 브로드캐스트를 이용한 안 읽은 메시지 수정
        const { email: sender, firstUnreadMessageId } = chatData;

        // 모든 참여자의 chats의 unread에서 sender의 이메일을 삭제함 => sender가 메시지를 읽음
        setChats((prev) => {
          // sender가 읽지 않은 첫 메시지 index
          const firstUnreadMessageIndex = prev.findIndex(
            (c) => c.chatId === firstUnreadMessageId
          );

          // 읽은 메시지들
          const readChats = prev.slice(0, firstUnreadMessageIndex);
          // 안 읽은 메시지들
          // 안 읽은 메시지들의 unread에서 sender 삭제
          const unreadChats = prev.slice(firstUnreadMessageIndex).map((c) => ({
            ...c,
            unread: c.unread.filter((u) => u !== sender),
          }));

          return [...readChats, ...unreadChats];
        });
      }
    };

    ws.onclose = () => {
      console.log("접속 종료");
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
