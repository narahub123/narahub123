import { useChatroomContext } from "../contexts";
import { useUserStore } from "../stores/useUserStore";
import ProfileImage from "./ProfileImage";

const ChatroomModalBody = () => {
  const { chatroom, chats, user } = useChatroomContext();

  return (
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
                  <p className={`p-2 ${bgColor} rounded-md shadow-sm max-w-60`}>
                    {text}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatroomModalBody;
