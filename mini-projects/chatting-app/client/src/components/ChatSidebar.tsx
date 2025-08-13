import { sidebars } from "../data";
import { Button, Icon } from "../theme/daisyui";

const ChatSidebar = () => {
  return (
    <aside className="flex flex-col justify-between p-2 border-r h-60">
      <div className="flex flex-col">
        {sidebars.map((sidebar) => (
          <Button className="btn rounded-full w-[50px] aspect-square bg-transparent border-0 shadow-none p-3">
            <img
              src={sidebar.src}
              alt={sidebar.alt}
              style={{ width: 40, aspectRatio: 1 / 1 }}
            />
          </Button>
        ))}
      </div>
      <div>
        <Button className="btn rounded-full w-[50px] aspect-square bg-transparent border-0 shadow-none">
          <Icon
            name="more_horiz"
            className="text-2xl bg-transparent border-0 shadow-none"
          />
        </Button>
      </div>
    </aside>
  );
};

export default ChatSidebar;
