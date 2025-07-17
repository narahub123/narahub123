import { FC, useEffect, useRef, useState } from "react";
import { LadderGameSelector } from "./LadderGameSelector";
import { Position } from "../types";

export type LadderGameSelectorsContainerProps = {
  isStarted: boolean;
  participants: number;
  setSelectorPositions: React.Dispatch<React.SetStateAction<Position[]>>;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export const LadderGameSelectorsContainer: FC<
  LadderGameSelectorsContainerProps
> = ({ isStarted, participants, setSelectorPositions, setSelected }) => {
  const selectorRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const getPositions = () => {
      if (!selectorRefs.current) return;

      const selectors = selectorRefs.current;

      const selectorPositions = selectors
        .filter((s) => s !== null)
        .map((selector) => {
          const { left, top, width, height } =
            selector!.getBoundingClientRect();

          const centerX = left + width / 2 - window.innerWidth * 0.1 - 16;
          const centerY = top + height / 2;

          return {
            centerX,
            centerY,
          };
        });

      setSelectorPositions(selectorPositions);
    };

    getPositions();

    window.addEventListener("resize", getPositions);

    return () => window.removeEventListener("resize", getPositions);
  }, [participants, selectorRefs.current]);

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
