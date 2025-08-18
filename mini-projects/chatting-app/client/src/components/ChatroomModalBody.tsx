import { useEffect, useRef, useState } from "react";
import { useChatroomContext } from "../contexts";
import Icon from "./Icon";
import ProfileImage from "./ProfileImage";

const ChatroomModalBody = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const lastReadMsgRef = useRef<HTMLLIElement>(null);
  const firstUnreadMsgRef = useRef<HTMLLIElement>(null);
  const { chatroom, setChatroom, chats, setChats, user, isLoading } =
    useChatroomContext();
  const [lastReadMessageId, setLastReadMessageId] = useState("");
  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState("");

  // 마지막 읽은 메시지, 처음 안 읽은 메시 설정
  useEffect(() => {
    const participant = chatroom.participants.find(
      (p) => p.email === user?.email
    );

    if (!participant) return;

    const lastReadMessageId = participant.lastReadMessageId!;

    const lastReadMessageIndex = chats.findIndex(
      (chat) => chat.chatId === lastReadMessageId
    );

    const firstUnreadMessageId =
      lastReadMessageIndex === chats.length - 1
        ? ""
        : chats[lastReadMessageIndex + 1].chatId;

    setLastReadMessageId(lastReadMessageId);
    setFirstUnreadMessageId(firstUnreadMessageId);
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

  // 로딩 중 스크롤 자동 이동
  useEffect(() => {
    if (!loadingRef.current) return;

    loadingRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isLoading]);

  // 읽음 표시
  useEffect(() => {
    if (!containerRef.current || !firstUnreadMsgRef.current) return;

    const container = containerRef.current;
    const target = firstUnreadMsgRef.current;

    // 관찰자 옵션
    const options: IntersectionObserverInit = {
      root: container,
      rootMargin: "0px",
      threshold: 0.8,
    };

    // 콜백
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("교차함");

          // firstUnreadMessage 이후 메시지는 읽음 처리
          const firstUnreadMessageIndex = chats.findIndex(
            (chat) => chat.chatId === firstUnreadMessageId
          );

          const readChats = chats.slice(0, firstUnreadMessageIndex);
          const unreadChats =
            firstUnreadMessageIndex === -1
              ? []
              : chats.slice(firstUnreadMessageIndex).map((chat) => ({
                  ...chat,
                  unread: chat.unread.filter((p) => p !== user?.email),
                }));

          const updatedChats = [...readChats, ...unreadChats];

          setChats(updatedChats);

          // 마지막 읽은 메시지 아이디 변경
          setChatroom((prev) => ({
            ...prev!,
            participants: prev!.participants.map((p) => ({
              ...p,
              lastReadMessageId:
                p.email === user?.email
                  ? chats[chats.length - 1].chatId
                  : p.lastReadMessageId,
            })),
          }));

          observer.unobserve(entry.target);
        }
      });
    };

    // 관찰자 설정
    const observer = new IntersectionObserver(callback, options);

    // 관찰 대상 전달
    observer.observe(target);

    // observer 해제
    return () => {
      observer.disconnect();
    };
  }, [firstUnreadMsgRef.current, containerRef.current]);

  console.log(lastReadMessageId);
  console.log(chats);

  return (
    <div className="h-[300px] overflow-y-auto px-2" ref={containerRef}>
      <ul className="">
        {(chats ?? []).map((chat, idx) => {
          const { sender, text, unread } = chat;

          const isMyself = user?.email === sender;

          const position = isMyself ? "justify-end" : "justify-start";
          const bgColor = isMyself ? "bg-yellow-100" : "bg-white";

          return (
            <li
              className={`flex ${position} gap-2`}
              key={`chat-${idx}`}
              ref={
                lastReadMessageId === chat.chatId
                  ? lastReadMsgRef
                  : firstUnreadMessageId === chat.chatId
                  ? firstUnreadMsgRef
                  : undefined
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
                <div className="flex items-end gap-1">
                  {isMyself && (
                    <p className="text-xs text-red-400">{unread.length}</p>
                  )}
                  <p className={`p-2 ${bgColor} rounded-md shadow-sm max-w-60`}>
                    {text}
                  </p>
                  {!isMyself && (
                    <p className="text-xs text-red-400">{unread.length}</p>
                  )}
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
