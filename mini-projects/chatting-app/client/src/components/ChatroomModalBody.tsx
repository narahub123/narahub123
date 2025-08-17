import { useEffect, useRef, useState } from "react";
import { useChatroomContext } from "../contexts";
import Icon from "./Icon";
import ProfileImage from "./ProfileImage";

const ChatroomModalBody = () => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const lastReadMsgRef = useRef<HTMLLIElement>(null);
  const { chatroom, chats, user, isLoading } = useChatroomContext();
  const [lastReadMessageId, setLastReadMessageId] = useState("");

  useEffect(() => {
    const participant = chatroom.participants.find(
      (p) => p.email === user?.email
    );

    if (!participant) return;

    console.log(participant);

    setLastReadMessageId(participant.lastReadMessageId!);
  }, [user, chatroom]);

  // 스크롤 자동 이동
  useEffect(() => {
    if (!lastReadMessageId) return;

    if (lastReadMsgRef.current) {
      lastReadMsgRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [lastReadMessageId]);

  useEffect(() => {
    if (!loadingRef.current) return;

    loadingRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isLoading]);

  console.log(lastReadMessageId);
  console.log(chats);

  return (
    <div className="h-[300px] overflow-y-auto px-2">
      <ul className="">
        {(chats ?? []).map((chat, idx) => {
          const { sender, text } = chat;

          const isMyself = user?.email === sender;

          const position = isMyself ? "justify-end" : "justify-start";
          const bgColor = isMyself ? "bg-yellow-100" : "bg-white";

          return (
            <li
              className={`flex ${position} gap-2`}
              key={`chat-${idx}`}
              ref={
                lastReadMessageId === chat.chatId ? lastReadMsgRef : undefined
              }
            >
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
                  <p className={`p-2 ${bgColor} rounded-md shadow-sm max-w-60`}>
                    {text}
                  </p>
                </div>
                <div className="w-full py-1"></div>
              </div>
            </li>
          );
        })}
        {isLoading && (
          <li className={``}>
            <div className={`flex justify-end gap-2`}>
              <span className="flex justify-center w-10">
                <Icon
                  name="data_usage"
                  className="text-gray-300 animate-spin"
                />
              </span>
            </div>
            <div className="w-full py-1" ref={loadingRef}></div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChatroomModalBody;
