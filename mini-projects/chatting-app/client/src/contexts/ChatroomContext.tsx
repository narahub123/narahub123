import { createContext, FC, PropsWithChildren, useContext } from "react";
import { ChatroomContextType } from "../types/contexts";

export const ChatroomContext = createContext<ChatroomContextType | null>(null);

interface ChatroomProviderProps {
  value: ChatroomContextType;
}

export const ChatroomProvider: FC<PropsWithChildren<ChatroomProviderProps>> = ({
  children,
  value,
}) => {
  return <ChatroomContext value={value}>{children}</ChatroomContext>;
};

export const useChatroomContext = () => {
  const context = useContext(ChatroomContext);

  if (!context) {
    console.error("ChatroomModal안에서만 사용 가능");
    throw new Error("에러");
  }

  return context;
};
