import { FC } from "react";
import Icon from "./Icon";
import { useLoginStore, useOpenStore } from "../stores";
import { fetchWithAuth, removeLoginState } from "../utils";

interface MoreDropdownProps {
  rect: {
    bottom: number;
    left: number;
  };
}

const MoreDropdown: FC<MoreDropdownProps> = ({ rect }) => {
  const { bottom, left } = rect;
  const isMoreDropdownOpen = useOpenStore((state) => state.isMoreDropdownOpen);
  const setIsChatModalOpen = useOpenStore((state) => state.setIsChatModalOpen);
  const setIsMoreDropdown = useOpenStore(
    (state) => state.setIsMoreDropdownOpen
  );

  // 로그인 상태 변경
  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);

  const menus = [
    {
      id: "logout",
      name: "로그아웃",
      icon: "logout",
    },
  ];

  const handleLogout = async () => {
    const response = await fetchWithAuth("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.success) {
      console.log("로그아웃 실패");

      return;
    }

    // 로그인 상태 변경
    setIsLoggedIn(false);

    // 로컬스토리지에서 삭제
    removeLoginState();

    // MoreDropdown 닫기
    setIsMoreDropdown(false);

    // ChatModal 닫기
    setIsChatModalOpen(false);
  };

  if (bottom === 0 || left === 0 || !isMoreDropdownOpen) return null;

  return (
    <div className="absolute z-20 border shrink-0" style={{ bottom, left }}>
      {menus.map((menu) => (
        <button
          className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50"
          key={menu.id}
          onClick={menu.id === "logout" ? handleLogout : undefined}
        >
          <Icon name={menu.icon} />
          {menu.name}
        </button>
      ))}
    </div>
  );
};

export default MoreDropdown;
