import { FC, useEffect, useRef } from "react";

export type LadderGameSelectorProps = {
  index: number;
  isStarted: boolean;
};

export const LadderGameSelector: FC<LadderGameSelectorProps> = ({
  index,
  isStarted,
}) => {
  return (
    <div className="relative w-10 aspect-square" key={`participant-${index}`}>
      <button
        className={`absolute top-0 left-0 w-10 border-2 rounded-full aspect-square ${
          isStarted ? "hover:scale-110" : ""
        }`}
        disabled={!isStarted} // 시작전에는 클릭 금지
      >
        {index + 1}
      </button>
    </div>
  );
};
