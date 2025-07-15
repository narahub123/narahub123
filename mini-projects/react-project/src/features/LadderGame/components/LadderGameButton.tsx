import { FC } from "react";
import { LadderGameButtonType } from "../types";

export type LadderGameButtonProps = {
  button: LadderGameButtonType;
};

export const LadderGameButton: FC<LadderGameButtonProps> = ({ button }) => {
  const { text, color, onClick } = button;
  const colorScheme = {
    warning: "bg-red-400 hover:bg-red-500",
    primary: "bg-blue-400 hover:bg-blue-500",
  }[color];

  return (
    <div>
      <button
        className={`px-4 py-2 text-white rounded-lg ${colorScheme}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
