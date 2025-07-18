import { FC } from "react";
import { LadderGameInputs } from "./LadderGameInputs";
import { LadderGameButtonContainer } from "./LadderGameButtonContainer";

export const LadderGameControls: FC = () => {
  return (
    <div className="w-full">
      <LadderGameInputs />
      <LadderGameButtonContainer />
    </div>
  );
};
