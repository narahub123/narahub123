import { FC } from "react";
import Icon from "./Icon";
import { useOpenStore } from "../stores";

interface ChatroomSettingsProps {
  rect: {
    top: number;
    left: number;
  };
}

const ChatroomSettings: FC<ChatroomSettingsProps> = ({ rect }) => {
  const isChatroomSettingsOpen = useOpenStore(
    (state) => state.isChatroomSettingOpen
  );
  const setIsChatroomSettingsOpen = useOpenStore(
    (state) => state.setIsChatroomSettingOpen
  );

  const menus = [
    {
      name: "대화상대 초대하기",
      icon: "add",
    },
    {
      name: "대화방 나가기",
      icon: "logout",
    },
  ];

  if (!isChatroomSettingsOpen || (rect.top === 0 && rect.left === 0))
    return null;

  return (
    <div
      className="absolute z-10 flex flex-col bg-white"
      style={{ top: rect.top, left: rect.left - 70 }}
    >
      {menus.map((menu) => (
        <button className="flex items-center gap-1 p-4 text-sm hover:bg-gray-100">
          <Icon name={menu.icon} className="text-gray-500" />
          <p>{menu.name}</p>
        </button>
      ))}
    </div>
  );
};

export default ChatroomSettings;
