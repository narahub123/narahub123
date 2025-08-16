import { FC } from "react";
import { IChatroom } from "../types";
import { useUserStore } from "../stores/useUserStore";
import { useChatroomsStore } from "../stores/useChatroomsStore";

interface ChatroomItemProps {
  chatroom: IChatroom;
}

const ChatroomItem: FC<ChatroomItemProps> = ({ chatroom }) => {
  const { isSecret, roomId, roomTitle, roomIntro, participants, roomCapacity } =
    chatroom;
  const userId = useUserStore((state) => state.user?.userId!);
  const addConnectedChatroom = useChatroomsStore(
    (state) => state.addConnectedChatroom
  );

  return (
    <li
      key={chatroom.roomId}
      className="py-2 border-b cursor-pointer"
      onClick={() => addConnectedChatroom(roomId)}
    >
      <div className="flex gap-2">
        <span>{isSecret ? "비밀" : "오픈"}</span>
        <p className="font-bold">{roomTitle}</p>
      </div>
      <div className="text-sm">
        <p className="text-gray-500">{roomIntro}</p>
      </div>
      <div className="space-x-2 text-sm text-gray-500">
        <span>
          {participants.length} / {roomCapacity}
        </span>
        <span>{participants.includes(userId!) ? "가입" : "비가입"}</span>
      </div>
    </li>
  );
};

export default ChatroomItem;
