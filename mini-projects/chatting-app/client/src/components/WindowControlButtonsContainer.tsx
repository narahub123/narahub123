import { FC } from "react";
import { windowControllers } from "../data";
import Icon from "./Icon";

interface WindowControlButtonsContainerProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const WindowControlButtonsContainer: FC<WindowControlButtonsContainerProps> = ({
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <div className="space-x-1">
      {windowControllers.map((cont) => {
        const onClick =
          cont.id === "minimize"
            ? onMinimize
            : cont.id === "maximize"
            ? onMaximize
            : onClose;

        if (cont.id === "minimize" && !onMinimize) return null;
        if (cont.id === "maximize" && !onMaximize) return null;
        return (
          <button key={cont.name} onClick={onClick}>
            <Icon name={cont.name} title={cont.title} />
          </button>
        );
      })}
    </div>
  );
};

export default WindowControlButtonsContainer;
