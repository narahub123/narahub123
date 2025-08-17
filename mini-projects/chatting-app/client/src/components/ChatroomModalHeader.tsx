import { useEffect, useRef } from "react";
import { useChatroomContext } from "../contexts";
import Icon from "./Icon";
import ProfileImage from "./ProfileImage";
import { useOpenStore } from "../stores";

const ChatroomModalHeader = () => {
  const menuRef = useRef<HTMLButtonElement>(null);

  const { chatroom, roomId, setMenuRect } = useChatroomContext();

  const isChatroomSettingsOpen = useOpenStore(
    (state) => state.isChatroomSettingOpen
  );
  const setIsChatroomSettingsOpen = useOpenStore(
    (state) => state.setIsChatroomSettingOpen
  );

  // 메뉴 위치 계산
  useEffect(() => {
    if (!menuRef.current) return;

    const getMenuPosition = () => {
      const menu = menuRef.current;

      if (!menu) return;

      const { bottom, left } = menu.getBoundingClientRect();

      setMenuRect({ top: bottom, left });
    };

    getMenuPosition();

    window.addEventListener("resize", getMenuPosition);
    window.addEventListener("scroll", getMenuPosition);

    return () => {
      window.removeEventListener("resize", getMenuPosition);
      window.removeEventListener("scroll", getMenuPosition);
    };
  }, [isChatroomSettingsOpen]);

  const onChatroomSettingOpen = () => {
    setIsChatroomSettingsOpen(isChatroomSettingsOpen ? false : true);
  };

  return (
    <div className="flex items-center justify-between flex-shrink-0 p-2">
      <div className="flex items-center gap-2">
        <div>
          {/* rounded 조절 필요? 아님 기본 컴포넌트 추가? */}
          <ProfileImage src={chatroom.roomProfileImage || ""} size={50} />
        </div>
        <div className="flex flex-col justify-center">
          <h2>{`${chatroom.roomTitle}(${roomId})`}</h2>
          <span className="flex items-center text-gray-500">
            <Icon name="person" />
            <p>{chatroom.participants.length}</p>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button>
          <Icon name="search" className="text-2xl" />
        </button>
        <button ref={menuRef} onClick={onChatroomSettingOpen}>
          <Icon name="menu" className="text-2xl " />
        </button>
      </div>
    </div>
  );
};

export default ChatroomModalHeader;
