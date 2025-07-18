import { FC } from "react";
import { LadderGameResult } from "./LadderGameResult";
import { useLadderGameContext } from "../hooks";

export type LadderGameResultsContainerProps = {};

export const LadderGameResultsContainer: FC = () => {
  const { participants, isStarted, winners } = useLadderGameContext();

  return (
    <div className="flex flex-row w-full justify-evenly">
      {Array.from({ length: participants }).map((_, index) => (
        <LadderGameResult
          index={index}
          isStarted={isStarted}
          key={`result-${index}`}
          isWinner={winners[index]}
        />
      ))}
    </div>
  );
};
