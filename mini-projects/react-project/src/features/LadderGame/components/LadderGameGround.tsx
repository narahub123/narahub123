import { FC } from "react";
import { LadderGameSelectorsContainer } from "./LadderGameSelectorsContainer";

export type LadderGameGroundProps = {};

export const LadderGameGround: FC<LadderGameGroundProps> = ({}) => {
  return (
    <div className="flex flex-col w-full gap-4 mt-4">
      <LadderGameSelectorsContainer />
    </div>
  );
};
