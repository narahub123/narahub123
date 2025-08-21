import { ChatInfo, ChatroomInfo } from "./components";
import { UserInfo } from "./stores";

export interface ChatroomContextType {
  roomId: string;
  chatroom: ChatroomInfo;
  setChatroom: React.Dispatch<React.SetStateAction<ChatroomInfo | undefined>>;
  menuRect: {
    top: number;
    left: number;
  };
  setMenuRect: React.Dispatch<
    React.SetStateAction<{
      top: number;
      left: number;
    }>
  >;
  chat: string;
  setChat: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  chats: ChatInfo[];
  setChats: React.Dispatch<React.SetStateAction<ChatInfo[]>>;
  websocket: WebSocket | null;
  user: UserInfo | null;
  firstUnreadMessageId: string;
  setFirstUnreadMessageId: React.Dispatch<React.SetStateAction<string>>;
}
