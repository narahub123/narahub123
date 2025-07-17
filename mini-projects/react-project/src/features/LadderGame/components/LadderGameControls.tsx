import { FC } from "react";
import { LadderGameInputs } from "./LadderGameInputs";
import { LadderGameButtonContainer } from "./LadderGameButtonContainer";

export type LadderGameControlsProps = {
  participants: number;
  numOfWinners: number;
  handleParticipantsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWinnersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGameStart: () => void;
  initializeData: () => void;
  disabled: boolean;
};

export const LadderGameControls: FC<LadderGameControlsProps> = ({
  participants,
  numOfWinners,
  handleParticipantsChange,
  handleWinnersChange,
  handleGameStart,
  initializeData,
  disabled,
}) => {
  return (
    <div className="w-full">
      <LadderGameInputs
        participants={participants}
        numOfWinners={numOfWinners}
        handleParticipantsChange={handleParticipantsChange}
        handleWinnersChange={handleWinnersChange}
        disabled={disabled}
      />
      <LadderGameButtonContainer
        handleGameStart={handleGameStart}
        initializeData={initializeData}
      />
    </div>
  );
};
