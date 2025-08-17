import { FC, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { useUserStore } from "../stores/useUserStore";
import { ChatInfo, ChatroomInfo } from "../types";
import { fetchWithAuth } from "../utils";

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [chat, setChat] = useState("");
  const [chatroom, setChatroom] = useState<ChatroomInfo>();

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchChatroomData = async () => {
      const response = await fetchWithAuth(`/chatrooms/${roomId}`);

      if (!response.success) {
        console.error("채팅방 정보 조회 실패");
        return;
      }

      const { chats, ...rest } = response.data.chatroom;

      setChats(chats);
      setChatroom(rest);
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

  const handleClick = () => {
    if (!websocket || !chat || !user) return;
    console.log("클릭함");

    const msg = {
      roomId,
      email: user.email,
      text: chat,
    };

    websocket.send(JSON.stringify(msg));
    setChat("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setChat(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleClick();
    }
  };

  return isOpen ? (
    <Modal open={isOpen}>
      <ModalContent>
        <div className="flex justify-end">
          <button onClick={() => onClose(roomId)}>닫기</button>
        </div>
        <h2>{`${chatroom?.roomTitle}(${roomId})`}</h2>
        <div>
          <ul className="space-y-2">
            {(chats ?? []).map((chat, idx) => {
              const { sender, text } = chat;

              const isMyself = user?.email === sender;

              const position = isMyself ? "justify-end" : "justify-start";
              const bgColor = isMyself ? "bg-yellow-100" : "bg-blue-100";
              return (
                <li className={`flex ${position}`} key={`chat-${idx}`}>
                  <p className={`p-2 ${bgColor} rounded-md max-w-60`}>{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center mt-2 space-x-4">
          <textarea
            className="w-full p-2 border"
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={chat}
          />
          <Button onClick={handleClick} disabled={!chat}>
            전송
          </Button>
        </div>
      </ModalContent>
    </Modal>
  ) : null;
};

export default ChatroomModal;
