import { ChatroomInfo } from "./components";

export interface ChatroomContextType {
  chatroom: ChatroomInfo;
  roomId: string;
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
}
