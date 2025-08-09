import { FC, useState } from "react";
import { Icon } from "../components";
import { useLoginStore, useWidgetButtonStore } from "../stores";

const WidgetButton: FC = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const setIsAuthMenuOpen = useWidgetButtonStore(
    (state) => state.setIsAuthMenuOpen
  );

  const handleAuthMenu = () => {
    setIsAuthMenuOpen((prev: boolean) => !prev);
  };

  return (
    <button className="fixed bottom-5 right-5">
      <div
        className="w-16 h-16 rounded-full bg-blue-400 flex justify-center items-center shadow-lg hover:bg-blue-500"
        onClick={isLoggedIn ? () => {} : () => handleAuthMenu()}
      >
        {isLoggedIn ? (
          <Icon name="chat_bubble" className="font-bold text-4xl text-white" />
        ) : (
          <Icon name="fingerprint" className="font-bold text-5xl text-white" />
        )}
      </div>
    </button>
  );
};

export default WidgetButton;
