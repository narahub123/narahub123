import { FC } from "react";
import { useOpenStore } from "../stores";

const ChatroomList: FC = () => {
  const setIsChatroomOpen = useOpenStore((state) => state.setIsChatroomOpen);

  const handleOpen = () => {
    setIsChatroomOpen(true);
  };
  return (
    <section>
      <div>
        <button onClick={handleOpen}>채팅방 열기</button>
      </div>
    </section>
  );
};

export default ChatroomList;
