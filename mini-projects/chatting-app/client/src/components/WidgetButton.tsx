import { FC } from "react";
import { Icon } from "../components";
import { useChatroomsStore, useLoginStore, useOpenStore } from "../stores";

const WidgetButton: FC = () => {
  const connectedChatrooms = useChatroomsStore(
    (state) => state.connectedChatrooms
  );
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const setIsAuthMenuOpen = useOpenStore((state) => state.setIsAuthMenuOpen);
  const setIsChatModalOpen = useOpenStore((state) => state.setIsChatModalOpen);

  const handleAuthMenu = () => {
    setIsAuthMenuOpen((prev: boolean) => !prev);
  };

  const handleChatModalOpen = () => {
    setIsChatModalOpen(true);
  };

  return (
    <div className="fixed flex flex-col items-center gap-2 bottom-5 right-5">
      <button>
        <div
          className="flex items-center justify-center w-16 h-16 bg-blue-400 rounded-full shadow-lg hover:bg-blue-500"
          onClick={isLoggedIn ? handleChatModalOpen : () => handleAuthMenu()}
        >
          {isLoggedIn ? (
            <Icon
              name="chat_bubble"
              className="text-4xl font-bold text-white"
            />
          ) : (
            <Icon
              name="fingerprint"
              className="text-5xl font-bold text-white"
            />
          )}
        </div>
      </button>
      <div>
        {connectedChatrooms.map((c) => (
          <div>{c.roomTitle}</div>
        ))}
      </div>
    </div>
  );
};

export default WidgetButton;
