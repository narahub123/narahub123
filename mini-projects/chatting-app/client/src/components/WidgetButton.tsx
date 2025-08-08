import { FC, useState } from "react";
import Icon from "./Icon";

const WidgetButton: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <button className="fixed bottom-5 right-5">
      <div className="w-16 h-16 rounded-full bg-blue-400 flex justify-center items-center shadow-lg hover:bg-blue-500">
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
