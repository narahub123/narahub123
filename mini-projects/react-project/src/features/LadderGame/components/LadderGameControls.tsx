import { FC } from "react";
import { LadderGameInputs } from "./LadderGameInputs";
import { LadderGameButtonContainer } from "./LadderGameButtonContainer";

export type LadderGameControlsProps = {
  handleGameStart: () => void;
  initializeData: () => void;
};

export const LadderGameControls: FC<LadderGameControlsProps> = ({
  handleGameStart,
  initializeData,
}) => {
  return (
    <div className="w-full">
      <LadderGameInputs />
      <LadderGameButtonContainer
        handleGameStart={handleGameStart}
        initializeData={initializeData}
      />
    </div>
  );
};
