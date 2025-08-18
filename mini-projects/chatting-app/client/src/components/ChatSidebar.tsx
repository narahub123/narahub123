import { FC, useLayoutEffect, useRef, useState } from "react";
import { sidebars } from "../data";
import { Button, Icon } from "../theme/daisyui";
import { PageType } from "../types";
import MoreDropdown from "./MoreDropdown";
import { useOpenStore } from "../stores";

interface ChatSidebarProps {
  setCurPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const ChatSidebar: FC<ChatSidebarProps> = ({ setCurPage }) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const moreIconRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ bottom: number; left: number }>({
    bottom: 0,
    left: 0,
  });

  const isMoreDropdownOpen = useOpenStore((state) => state.isMoreDropdownOpen);
  const setIsMoreDropdownOpen = useOpenStore(
    (state) => state.setIsMoreDropdownOpen
  );

  // more 버튼 위치
  useLayoutEffect(() => {
    const getIconPosition = () => {
      if (!moreIconRef.current || !sidebarRef.current) return;
      const {
        bottom: SidebarBottom,
        left: SidebarLeft,
        width,
      } = sidebarRef.current.getBoundingClientRect();
      const { bottom, left } = moreIconRef.current.getBoundingClientRect();

      setRect({
        bottom: SidebarBottom - bottom + 3,
        left: left + width - SidebarLeft + 2,
      });
    };

    getIconPosition();

    window.addEventListener("resize", getIconPosition);
    window.addEventListener("scoll", getIconPosition);

    return () => {
      window.removeEventListener("resize", getIconPosition);
      window.removeEventListener("scoll", getIconPosition);
    };
  }, []);

  const handleClick = (pageType: PageType) => {
    setCurPage(pageType);
  };

  const handleMoreDropdownOpen = () => {
    setIsMoreDropdownOpen(isMoreDropdownOpen ? false : true);
  };

  return (
    <aside
      className="flex flex-col justify-between p-2 border-r h-60"
      ref={sidebarRef}
    >
      <div className="flex flex-col">
        {sidebars.map((sidebar) => (
          <Button
            className="btn rounded-full w-[50px] aspect-square bg-transparent border-0 shadow-none p-3"
            key={sidebar.src}
            onClick={() => handleClick(sidebar.type as PageType)}
          >
            <img
              src={sidebar.src}
              alt={sidebar.alt}
              style={{ width: 40, aspectRatio: 1 / 1 }}
            />
          </Button>
        ))}
      </div>
      <MoreDropdown rect={rect} />
      <div ref={moreIconRef}>
        <Icon
          name="more_horiz"
          className="text-2xl bg-transparent border-0 shadow-none"
          onClick={handleMoreDropdownOpen}
        />
      </div>
    </aside>
  );
};

export default ChatSidebar;
