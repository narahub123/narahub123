import { FC } from "react";
import { useOpenStore } from "../stores";

const ChatroomList: FC = () => {
  const setIsChatroomCreateModalOpen = useOpenStore(
    (state) => state.setIsChatroomCreateModalOpen
  );

  const handleOpen = () => {
    setIsChatroomCreateModalOpen(true);
  };

  return (
    <section>
      <div>
        <button onClick={handleOpen}>채팅방 생성</button>
      </div>
    </section>
  );
};

export default ChatroomList;
