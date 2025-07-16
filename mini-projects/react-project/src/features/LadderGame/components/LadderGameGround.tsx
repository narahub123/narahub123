import { FC, useState } from "react";
import {
  LadderGameLadderContainer,
  LadderGameResultsContainer,
  LadderGameSelectorsContainer,
} from "../components";
import { SelectorPosition } from "../types";

export type LadderGameGroundProps = {
  isStarted: boolean;
  participants: number;
};

export const LadderGameGround: FC<LadderGameGroundProps> = ({
  isStarted,
  participants,
}) => {
  const [selectorPositions, setSelectorPositions] = useState<
    SelectorPosition[]
  >([]);

  return (
    <div className="flex flex-col w-full gap-4 mt-4">
      <LadderGameSelectorsContainer
        isStarted={isStarted}
        participants={participants}
        selectorPositions={selectorPositions}
        setSelectorPositions={setSelectorPositions}
      />
      <LadderGameLadderContainer
        isStarted={isStarted}
        participants={participants}
        selectorPositions={selectorPositions}
      />
      <LadderGameResultsContainer
        isStarted={isStarted}
        participants={participants}
      />
    </div>
  );
};
