import { FC } from "react";
import { LadderGameInputs } from "./LadderGameInputs";

export type LadderGameControlsProps = {
  participants: number;
  winners: number;
  handleParticipantsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWinnersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export const LadderGameControls: FC<LadderGameControlsProps> = ({
  participants,
  winners,
  handleParticipantsChange,
  handleWinnersChange,
  disabled,
}) => {
  return (
    <div className="w-full">
      <LadderGameInputs
        participants={participants}
        winners={winners}
        handleParticipantsChange={handleParticipantsChange}
        handleWinnersChange={handleWinnersChange}
        disabled={disabled}
      />
    </div>
  );
};
