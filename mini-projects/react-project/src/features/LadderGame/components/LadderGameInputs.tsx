import { FC } from "react";
import { LadderGameInput } from "./LadderGameInput";
import { useLadderGameContext } from "../hooks";

export type LadderGameInputsProps = {
  handleParticipantsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWinnersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LadderGameInputs: FC<LadderGameInputsProps> = ({
  handleParticipantsChange,
  handleWinnersChange,
}) => {
  const { numOfWinners, participants, isStarted } = useLadderGameContext();
  const inputs = [
    {
      label: "참여인원",
      value: participants,
      onChange: handleParticipantsChange,
    },
    {
      label: "당첨 인원",
      value: numOfWinners,
      onChange: handleWinnersChange,
      max: participants,
    },
  ];

  return (
    <div className="flex flex-row justify-center w-full gap-4">
      {inputs.map((input) => {
        const { value, onChange, label, max } = input;
        return (
          <LadderGameInput
            label={label}
            value={value}
            onChange={onChange}
            disabled={isStarted}
            max={max}
            key={label}
          />
        );
      })}
    </div>
  );
};
