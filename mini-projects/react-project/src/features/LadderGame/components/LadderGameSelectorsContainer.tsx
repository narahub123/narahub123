import { FC, useRef } from "react";
import { LadderGameSelector } from "./LadderGameSelector";
import { useLadderGameContext, useSelectorPositions } from "../hooks";

export type LadderGameSelectorsContainerProps = {};

export const LadderGameSelectorsContainer: FC = () => {
  const selectorRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { isStarted, participants, setSelectorPositions, setSelected } =
    useLadderGameContext();

  // 버튼 위치 알아내기
  useSelectorPositions({ selectorRefs });

  return (
    <div className="flex flex-row w-full justify-evenly">
      {Array.from({ length: participants }).map((_, index) => (
        <LadderGameSelector
          index={index}
          isStarted={isStarted}
          key={`selector-${index}`}
          ref={(el: HTMLButtonElement | null) => {
            selectorRefs.current[index] = el;
          }}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};
