import { useRef } from "react";
import { useChatroomContext } from "../contexts";

const ChatroomModalFooter = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { setChat, chat, roomId, user, websocket, setIsLoading } =
    useChatroomContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setChat(value);
  };

  const handleClick = () => {
    if (!websocket || !chat || !user) return;
    console.log("클릭함");

    const msg = {
      type: "message",
      roomId,
      email: user.email,
      text: chat,
    };

    websocket.send(JSON.stringify(msg));
    setIsLoading(true);
    setChat("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleClick();
    }
  };
  return (
    <div className="flex-shrink-0 p-2 space-y-2 bg-white">
      <div>
        <textarea
          className="w-full p-2 focus:outline-none"
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={chat}
          placeholder="메시지 입력"
        />
      </div>
      <div className="flex">
        <div className="flex-1"></div>
        <div>
          <button
            type="button"
            onClick={handleClick}
            disabled={!chat}
            className="px-4 py-2 text-sm text-white bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 disabled:bg-gray-300"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatroomModalFooter;
