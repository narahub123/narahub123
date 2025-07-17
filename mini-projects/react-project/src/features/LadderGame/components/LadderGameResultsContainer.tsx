import { FC } from "react";
import { LadderGameResult } from "./LadderGameResult";

export type LadderGameResultsContainerProps = {
  participants: number;
  isStarted: boolean;
  winners: boolean[];
};

export const LadderGameResultsContainer: FC<
  LadderGameResultsContainerProps
> = ({ participants, isStarted, winners }) => {
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
