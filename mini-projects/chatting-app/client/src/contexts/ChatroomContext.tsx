import { createContext, FC, PropsWithChildren } from "react";
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
