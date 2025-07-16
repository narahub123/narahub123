import { FC, useEffect, useRef, useState } from "react";
import { LadderGameSelector } from "./LadderGameSelector";
import { Position } from "../types";

export type LadderGameSelectorsContainerProps = {
  isStarted: boolean;
  participants: number;
  selectorPositions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
};

export const LadderGameSelectorsContainer: FC<
  LadderGameSelectorsContainerProps
> = ({ isStarted, participants, selectorPositions, setPositions }) => {
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

          const centerX = left + width / 2;
          const centerY = top + height / 2;

          return {
            centerX,
            centerY,
          };
        });

      setPositions(selectorPositions);
    };

    getPositions();

    window.addEventListener("resize", getPositions);

    return () => window.removeEventListener("resize", getPositions);
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
