import { FC, useEffect, useRef, useState } from "react";
import { LadderGameSelector } from "./LadderGameSelector";
import { SelectorPosition } from "../types";

export type LadderGameSelectorsContainerProps = {
  isStarted: boolean;
  participants: number;
};

export const LadderGameSelectorsContainer: FC<
  LadderGameSelectorsContainerProps
> = ({ isStarted, participants }) => {
  const selectorRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectorPositions, setSelectorPositions] = useState<
    SelectorPosition[]
  >([]);

  useEffect(() => {
    const getSelectorPositions = () => {
      if (!selectorRefs.current) return;

      const selectors = selectorRefs.current;

      const selectorPositions = selectors
        .filter((s) => s !== null)
        .map((selector) => {
          const { left, top, width, height } =
            selector!.getBoundingClientRect();

          const centerX = left + width / 2;
          const centerY = top + height / 2;

          return {
            centerX,
            centerY,
          };
        });

      setSelectorPositions(selectorPositions);
    };

    getSelectorPositions();

    window.addEventListener("resize", getSelectorPositions);

    return () => window.removeEventListener("resize", getSelectorPositions);
  }, [participants, selectorRefs.current]);

  console.log(selectorPositions);

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
        />
      ))}
    </div>
  );
};
