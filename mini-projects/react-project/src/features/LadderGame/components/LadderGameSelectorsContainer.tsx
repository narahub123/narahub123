import { FC } from "react";
import { LadderGameSelector } from "./LadderGameSelector";

export type LadderGameSelectorsContainerProps = {
  isStarted: boolean;
  participants: number;
};

export const LadderGameSelectorsContainer: FC<
  LadderGameSelectorsContainerProps
> = ({ isStarted, participants }) => {
  return (
    <div className="flex flex-row w-full justify-evenly">
      {Array.from({ length: participants }).map((_, index) => (
        <LadderGameSelector
          index={index}
          isStarted={isStarted}
          key={`selector-${index}`}
        />
      ))}
    </div>
  );
};
