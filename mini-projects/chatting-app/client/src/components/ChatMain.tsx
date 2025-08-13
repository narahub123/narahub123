import { Icon } from "../components";
import { windowControllers } from "../data";
import { useLoginStore, useOpenStore } from "../stores";
import { removeLoginState } from "../utils";

const ChatMain = () => {
  const setIsChatModalOpen = useOpenStore((state) => state.setIsChatModalOpen);
  const setIsLogggedIn = useLoginStore((state) => state.setIsLoggedIn);

  const handleLogout = () => {
    removeLoginState();
    setIsLogggedIn(false);
    setIsChatModalOpen(false);
  };

  const handleClose = () => {
    setIsChatModalOpen(false);
  };

  return (
    <main className="flex-1">
      <div className="flex justify-end">
        <div className="pt-1 pr-1 space-x-1">
          {windowControllers.map((cont) => (
            <button
              key={cont.name}
              onClick={cont.name === "close" ? handleLogout : handleClose}
            >
              <Icon name={cont.name} title={cont.title} />
            </button>
          ))}
        </div>
      </div>
      <section>목록</section>
    </main>
  );
};

export default ChatMain;
