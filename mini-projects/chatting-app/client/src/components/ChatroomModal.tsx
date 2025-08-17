import { FC, useEffect, useRef, useState } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useUserStore } from "../stores/useUserStore";
import { ChatInfo, ChatroomInfo } from "../types";
import { fetchWithAuth } from "../utils";
import {
  WindowControlButtonsContainer,
  Icon,
  ProfileImage,
  ChatroomSettings,
} from "../components";
import { useOpenStore } from "../stores";
import { ChatroomProvider } from "../contexts";
import { ChatroomContextType } from "../types/contexts";

interface ChatroomModalProps {
  roomId: string;
  isOpen?: boolean;
  onClose: (roomId: string) => void;
}

const ChatroomModal: FC<ChatroomModalProps> = ({
  roomId,
  isOpen = true,
  onClose,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [chat, setChat] = useState("");
  const [chatroom, setChatroom] = useState<ChatroomInfo>();
  const [isLoading, setIsLoading] = useState(false);

  const [menuRect, setMenuRect] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const user = useUserStore((state) => state.user);

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

  useEffect(() => {
    const fetchChatroomData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWithAuth(`/chatrooms/${roomId}`);

        if (!response.success) {
          console.error("채팅방 정보 조회 실패");
          return;
        }

        const { chats, ...rest } = response.data.chatroom;

        setChats(chats);
        setChatroom(rest);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatroomData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3301?roomId=${roomId}`);

    setWebsocket(ws);

    ws.onopen = () => {
      console.log("WebSocket 연결됨");
    };

    ws.onmessage = (event) => {
      let chat = event.data;

      if (chat === "connected") {
        // setConnection("접속 완료");
        return;
      }

      chat = JSON.parse(chat);

      setChats((prev) => [...prev, chat]);
    };

    ws.onclose = () => {
      //   setConnection("접속 종료");
    };
  }, []);

  const context: ChatroomContextType = {
    chatroom: chatroom!,
    roomId,
  };

  const handleClick = () => {
    if (!websocket || !chat || !user) return;
    console.log("클릭함");

    const msg = {
      roomId,
      email: user.email,
      text: chat,
    };

    websocket.send(JSON.stringify(msg));
    setChat("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setChat(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleClick();
    }
  };

  const onChatroomSettingOpen = () => {
    setIsChatroomSettingsOpen(isChatroomSettingsOpen ? false : true);
  };

  return isOpen && !isLoading && user && chatroom ? (
    <ChatroomProvider value={context}>
      <Modal open={isOpen && !isLoading}>
        <ChatroomSettings rect={menuRect} roomId={roomId} />
        <ModalContent className="flex flex-col p-0 rounded-md bg-blue-50">
          <div className="flex justify-end flex-shrink-0 p-2 pb-0">
            <WindowControlButtonsContainer
              onClose={() => onClose(roomId)}
              onMaximize={() => {}}
              onMinimize={() => {}}
            />
          </div>
          {/* 헤더 */}
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
          {/* 바디 */}
          <div className="h-[300px] overflow-y-auto px-2 ">
            <ul className="space-y-2">
              {(chats ?? []).map((chat, idx) => {
                const { sender, text } = chat;

                const isMyself = user?.email === sender;

                const position = isMyself ? "justify-end" : "justify-start";
                const bgColor = isMyself ? "bg-yellow-100" : "bg-white";
                return (
                  <li className={`flex ${position} gap-2`} key={`chat-${idx}`}>
                    {/* 상대방 사용자의 이미지 필요 */}
                    {!isMyself && (
                      <ProfileImage
                        src={chatroom?.roomProfileImage ?? ""}
                        size={50}
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      {!isMyself && <div>{sender}</div>}
                      <div className="flex">
                        <p
                          className={`p-2 ${bgColor} rounded-md shadow-sm max-w-60`}
                        >
                          {text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* 푸터 */}
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
        </ModalContent>
      </Modal>
    </ChatroomProvider>
  ) : null;
};

export default ChatroomModal;
