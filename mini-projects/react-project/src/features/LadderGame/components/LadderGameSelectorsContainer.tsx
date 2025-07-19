import { FC, useRef } from "react";
import { LadderGameSelector } from "./LadderGameSelector";
import { useLadderGameContext, useSelectorPositions } from "../hooks";

export type LadderGameSelectorsContainerProps = {};

export const LadderGameSelectorsContainer: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectorRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { isStarted, participants, setSelected } = useLadderGameContext();

  // 버튼 위치 알아내기
  useSelectorPositions({ selectorRefs, containerRef });

  return (
    <div className="flex flex-row w-full justify-evenly" ref={containerRef}>
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
