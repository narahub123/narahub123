import { FC } from "react";
import { LadderGameInput } from "./LadderGameInput";

export type LadderGameInputsProps = {
  participants: number;
  winners: number;
  handleParticipantsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWinnersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export const LadderGameInputs: FC<LadderGameInputsProps> = ({
  participants,
  winners,
  handleParticipantsChange,
  handleWinnersChange,
  disabled,
}) => {
  const inputs = [
    {
      label: "참여인원",
      value: participants,
      onChange: handleParticipantsChange,
    },
    {
      label: "당첨 인원",
      value: winners,
      onChange: handleWinnersChange,
    },
  ];

  return (
    <div className="flex flex-row justify-center w-full gap-4">
      {inputs.map((input) => {
        const { value, onChange, label } = input;
        return (
          <LadderGameInput
            label={label}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};
