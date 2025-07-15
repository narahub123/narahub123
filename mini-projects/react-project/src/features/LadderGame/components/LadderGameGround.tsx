import { FC } from "react";
import { LadderGameSelectorsContainer } from "./LadderGameSelectorsContainer";

export type LadderGameGroundProps = {
  isStarted: boolean;
  participants: number;
};

export const LadderGameGround: FC<LadderGameGroundProps> = ({
  isStarted,
  participants,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 mt-4">
      <LadderGameSelectorsContainer
        isStarted={isStarted}
        participants={participants}
      />
    </div>
  );
};
