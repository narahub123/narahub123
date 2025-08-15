import { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { useOpenStore } from "../stores";
import { useUserStore } from "../stores/useUserStore";
import { Chat } from "../types";

const ChatroomModal = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");

  const isChatroomOpen = useOpenStore((state) => state.isChatroomOpen);

  const setIsChatroomOpen = useOpenStore((state) => state.setIsChatroomOpen);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3301/");

    setWebsocket(ws);

    ws.onopen = () => {
      console.log("WebSocket 연결됨");
    };

    ws.onmessage = (event) => {
      let message = event.data;

      if (message === "connected") {
        // setConnection("접속 완료");
        return;
      }

      message = JSON.parse(message);

      setMessages((prev) => [...prev, message]);
    };

    ws.onclose = () => {
      //   setConnection("접속 종료");
    };
  }, []);

  const handleClick = () => {
    if (!websocket || !message || !user) return;
    console.log("클릭함");

    const msg: Chat = {
      roomId: "1",
      userId: user.userId,
      text: message,
    };

    websocket.send(JSON.stringify(msg));
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setMessage(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleClick();
    }
  };

  const handleClose = () => {
    setIsChatroomOpen(false);
  };

  return (
    <Modal open={isChatroomOpen}>
      <ModalContent>
        <div className="flex justify-end">
          <button onClick={handleClose}>닫기</button>
        </div>
        <h2>채팅방</h2>
        <div>
          <ul className="space-y-2">
            {messages.map((message, idx) => {
              const { roomId, userId, text } = message;

              const isMyself = user?.userId === userId;

              const position = isMyself ? "justify-end" : "justify-start";
              const bgColor = isMyself ? "bg-yellow-100" : "bg-blue-100";
              return (
                <li className={`flex ${position}`} key={`message-${idx}`}>
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
            value={message}
          />
          <Button onClick={handleClick} disabled={!message}>
            전송
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ChatroomModal;
