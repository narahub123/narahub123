import { FC } from "react";
import { notificationIcon } from "../data";
import { Button } from "../theme/daisyui";

interface NotificationIconProps {
  onClick: (value: any) => void;
}

const NotificationIcon: FC<NotificationIconProps> = ({ onClick }) => {
  const icon = {
    src: notificationIcon,
    alt: "알림 목록",
  };
  return (
    <div className="relative" onClick={onClick}>
      <Button className="btn rounded-full w-[50px] aspect-square bg-transparent border-0 shadow-none p-3">
        <img
          src={icon.src}
          alt={icon.alt}
          style={{ width: 40, aspectRatio: 1 / 1 }}
        />
      </Button>
      <div
        className="flex items-center justify-center w-5 text-xs text-white bg-blue-600 rounded-full aspect-square"
        style={{
          position: "absolute",
          bottom: 4,
          right: 4,
        }}
      >
        <p>1</p>
      </div>
    </div>
  );
};

export default NotificationIcon;
