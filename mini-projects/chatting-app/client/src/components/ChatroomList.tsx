import { FC, useEffect, useState } from "react";
import { useOpenStore } from "../stores";
import { useChatroomsStore } from "../stores/useChatroomsStore";
import { fetchWithAuth } from "../utils";
import { IChatroom } from "../types";

const ChatroomList: FC = () => {
  const [chatrooms, setChatrooms] = useState<IChatroom[]>([]);
  const setIsChatroomCreateModalOpen = useOpenStore(
    (state) => state.setIsChatroomCreateModalOpen
  );

  const setIsOpenChatroomModalOpen = useOpenStore(
    (state) => state.setIsOpenChatroomListModalOpen
  );

  const addConnectedChatroom = useChatroomsStore(
    (state) => state.addConnectedChatroom
  );

  const handleOpen = () => {
    setIsChatroomCreateModalOpen(true);
  };

  const handleOpenChatrooomList = () => {
    setIsOpenChatroomModalOpen(true);
  };

  // 가입된 채팅방 목록 가져오기
  useEffect(() => {
    const fetchJoinedChatroomInfo = async () => {
      const response = await fetchWithAuth("/users/me/chatrooms");

      if (!response.success) {
        console.error("사용자 가입 채팅방 조회 실패");
      }

      const chatrooms = response.data.chatrooms;
      setChatrooms(chatrooms);
    };

    fetchJoinedChatroomInfo();
  }, []);

  return (
    <section>
      <div className="space-x-4">
        <button onClick={handleOpen}>채팅방 생성</button>
        <button onClick={handleOpenChatrooomList}>채팅방 목록</button>
      </div>
      <div>
        <ul>
          {chatrooms?.map((chatroom) => {
            const { roomId, roomTitle, roomIntro, lastMessage } = chatroom;

            return (
              <li
                key={chatroom.roomId}
                className="py-2 border-b cursor-pointer"
                onClick={() => addConnectedChatroom(roomId)}
              >
                <div className="flex gap-2">
                  <p className="font-bold">{roomTitle}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">{roomIntro}</p>
                </div>
                {/* 마지막 메시지가 표시되어야 함 */}
                {lastMessage && (
                  <div>
                    <p>
                      {`${new Date(
                        lastMessage.createdAt
                      ).toLocaleDateString()} ${new Date(
                        lastMessage.createdAt
                      ).toLocaleTimeString()}`}
                    </p>
                    <p>{lastMessage.text}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ChatroomList;
