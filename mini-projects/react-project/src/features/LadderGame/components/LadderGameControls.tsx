import { FC } from "react";
import { LadderGameInputs } from "./LadderGameInputs";
import { LadderGameButtonContainer } from "./LadderGameButtonContainer";

export type LadderGameControlsProps = {
  handleParticipantsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWinnersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGameStart: () => void;
  initializeData: () => void;
};

export const LadderGameControls: FC<LadderGameControlsProps> = ({
  handleParticipantsChange,
  handleWinnersChange,
  handleGameStart,
  initializeData,
}) => {
  return (
    <div className="w-full">
      <LadderGameInputs
        handleParticipantsChange={handleParticipantsChange}
        handleWinnersChange={handleWinnersChange}
      />
      <LadderGameButtonContainer
        handleGameStart={handleGameStart}
        initializeData={initializeData}
      />
    </div>
  );
};
