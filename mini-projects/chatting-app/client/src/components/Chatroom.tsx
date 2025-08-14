import { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";

const Chatroom = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3301/");

    setWebsocket(ws);

    ws.onopen = () => {
      console.log("WebSocket 연결됨");
    };

    ws.onmessage = (event) => {
      const message = event.data;

      if (message === "connected") {
        // setConnection("접속 완료");
        return;
      }

      setMessages((prev) => [message, ...prev]);
    };

    ws.onclose = () => {
      //   setConnection("접속 종료");
    };
  }, []);

  const handleClick = () => {
    if (!websocket || !message) return;
    console.log("클릭함");
    websocket.send(`id-${message}`);
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

  return (
    <Modal open>
      <ModalContent>
        <h2>채팅방</h2>
        <div>
          <ul className="space-y-2">
            {messages.map((message) => (
              <li className="p-2 bg-blue-100 rounded-md max-w-60" key={message}>
                {message}
              </li>
            ))}
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

export default Chatroom;
