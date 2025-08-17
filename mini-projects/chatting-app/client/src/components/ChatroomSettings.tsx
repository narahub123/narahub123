import { FC, useState } from "react";
import Icon from "./Icon";
import { useOpenStore } from "../stores";
import { fetchWithAuth } from "../utils";
import { useUserStore } from "../stores/useUserStore";
import { useChatroomsStore } from "../stores/useChatroomsStore";

interface ChatroomSettingsProps {
  rect: {
    top: number;
    left: number;
  };
  roomId: string;
}

const ChatroomSettings: FC<ChatroomSettingsProps> = ({ rect, roomId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isChatroomSettingsOpen = useOpenStore(
    (state) => state.isChatroomSettingOpen
  );
  const setIsChatroomSettingsOpen = useOpenStore(
    (state) => state.setIsChatroomSettingOpen
  );

  const setIsChatroomModalOpen = useOpenStore(
    (state) => state.setIsChatroomOpen
  );

  const deleteChatroom = useUserStore((state) => state.deleteChatroom);

  const deleteConnectedChatroom = useChatroomsStore(
    (state) => state.deleteConnectedChatroom
  );

  const menus = [
    {
      name: "대화상대 초대하기",
      icon: "add",
      id: "invite",
    },
    {
      name: "대화방 나가기",
      icon: "logout",
      id: "leave",
    },
  ];

  const handleLeave = () => {
    const fetchLeaveData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWithAuth(`/chatrooms/${roomId}/leave`, {
          method: "DELETE",
        });

        if (!response.success) {
          console.error("채팅방 탈퇴 실패");
          return;
        }

        // 사용자의 chatrooms에서 해당 채팅방 삭제하기
        deleteChatroom(roomId);

        // 연결된 채팅방에서 삭제하기
        deleteConnectedChatroom(roomId);

        // settings 모달창 닫기
        setIsChatroomSettingsOpen(false);

        // 채팅방 모달 닫기
        setIsChatroomModalOpen(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveData();
  };

  if (!isChatroomSettingsOpen || (rect.top === 0 && rect.left === 0))
    return null;

  return (
    <div
      className="absolute z-10 flex flex-col bg-white"
      style={{ top: rect.top, left: rect.left - 70 }}
    >
      {menus.map((menu) => (
        <button
          className="flex items-center gap-1 p-4 text-sm hover:bg-gray-100"
          onClick={menu.id === "leave" ? handleLeave : () => {}}
          key={menu.id}
        >
          <Icon name={menu.icon} className="text-gray-500" />
          <p>{menu.name}</p>
        </button>
      ))}
    </div>
  );
};

export default ChatroomSettings;
