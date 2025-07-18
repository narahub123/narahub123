import { FC, useEffect, useRef, useState } from "react";
import { LadderGameSelector } from "./LadderGameSelector";
import { Position } from "../types";
import { useLadderGameContext } from "../hooks";

export type LadderGameSelectorsContainerProps = {};

export const LadderGameSelectorsContainer: FC = () => {
  const selectorRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { isStarted, participants, setSelectorPositions, setSelected } =
    useLadderGameContext();

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
