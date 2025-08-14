import { useEffect, useRef, useState } from "react";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [connection, setConnection] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (user) return;
    let username = window.prompt("이름을 작성해주세요.");

    if (!username) {
      username = window.prompt("이름을 작성해주세요.");
    } else {
      setUser(username);
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/");

    setWebSocket(ws);

    ws.onopen = () => {
      console.log("Websocket 연결됨");
    };

    ws.onmessage = function (event) {
      const message = event.data;

      if (message === "connected") {
        setConnection("접속 완료");
        return;
      }

      setMessages((prev) => [message, ...prev]);
    };

    ws.onclose = () => {
      setConnection("접속 종료");
    };
  }, []);

  const sendMessage = () => {
    if (!message) return;

    webSocket?.send(`${user}-${message}`);

    setMessage("");
  };

  const webSocketClose = () => {
    webSocket?.close();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setMessage(value);
  };

  // enter 클릭 시 메시지 전송
  const handleKeydown = (e: React.KeyboardEvent) => {
    // enter가 눌리고 shift 키는 눌리지 않는 경우
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // enter의 본래 기능 봉쇄
      if (!message) return;
      sendMessage();
    }
  };

  return (
    <div>
      <h1>화면</h1>
      <div>
        <textarea
          ref={textareaRef}
          className="border"
          onChange={handleChange}
          onKeyDown={handleKeydown}
          value={message}
        ></textarea>
      </div>
      <div className="space-x-4">
        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={!message}
        >
          전송
        </button>
        <button className="btn btn-warning" onClick={webSocketClose}>
          종료
        </button>
      </div>
      <div>
        <p>{connection}</p>
      </div>
      <div className="mt-4">
        <ul className="space-y-2">
          {messages.map((m, index) => (
            <li key={index} className="p-2 bg-yellow-200 rounded-md max-w-80">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
