import { FC } from "react";
import { sidebars } from "../data";
import { Button, Icon } from "../theme/daisyui";
import { PageType } from "../types";

interface ChatSidebarProps {
  setCurPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const ChatSidebar: FC<ChatSidebarProps> = ({ setCurPage }) => {
  const handleClick = (pageType: PageType) => {
    setCurPage(pageType);
  };

  return (
    <aside className="flex flex-col justify-between p-2 border-r h-60">
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
      <div>
        <Icon
          name="more_horiz"
          className="text-2xl bg-transparent border-0 shadow-none"
        />
      </div>
    </aside>
  );
};

export default ChatSidebar;
