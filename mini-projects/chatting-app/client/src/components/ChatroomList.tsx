import { FC } from "react";
import { useOpenStore } from "../stores";
import { useUserStore } from "../stores/useUserStore";
import { useChatroomsStore } from "../stores/useChatroomsStore";

const ChatroomList: FC = () => {
  const setIsChatroomCreateModalOpen = useOpenStore(
    (state) => state.setIsChatroomCreateModalOpen
  );
  const chatrooms = useUserStore((state) => state.user?.chatrooms);

  const addConnectedChatroom = useChatroomsStore(
    (state) => state.addConnectedChatroom
  );

  const handleOpen = () => {
    setIsChatroomCreateModalOpen(true);
  };

  return (
    <section>
      <div>
        <button onClick={handleOpen}>채팅방 생성</button>
      </div>
      <div>
        <ul>
          {chatrooms?.map((chatroom) => (
            <li
              key={chatroom}
              className="p-2 cursor-pointer"
              onClick={() => addConnectedChatroom(chatroom)}
            >
              {chatroom}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChatroomList;
