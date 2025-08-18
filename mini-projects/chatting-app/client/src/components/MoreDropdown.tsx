import { FC } from "react";
import Icon from "./Icon";
import { useOpenStore } from "../stores";

interface MoreDropdownProps {
  rect: {
    bottom: number;
    left: number;
  };
}

const MoreDropdown: FC<MoreDropdownProps> = ({ rect }) => {
  const { bottom, left } = rect;
  const isMoreDropdownOpen = useOpenStore((state) => state.isMoreDropdownOpen);

  const menus = [
    {
      id: "logout",
      name: "로그아웃",
      icon: "logout",
    },
  ];

  if (bottom === 0 || left === 0 || !isMoreDropdownOpen) return null;

  return (
    <div className="absolute z-20 border shrink-0" style={{ bottom, left }}>
      {menus.map((menu) => (
        <button
          className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50"
          key={menu.id}
        >
          <Icon name={menu.icon} />
          {menu.name}
        </button>
      ))}
    </div>
  );
};

export default MoreDropdown;
