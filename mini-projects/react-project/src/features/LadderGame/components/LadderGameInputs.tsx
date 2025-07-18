import { FC } from "react";
import { LadderGameInput } from "./LadderGameInput";
import { useLadderGameContext } from "../hooks";
import { handleParticipantsChange, handleWinnersChange } from "../utils";

export const LadderGameInputs: FC = () => {
  const {
    numOfWinners,
    participants,
    isStarted,
    setParticipants,
    setNumOfWinners,
  } = useLadderGameContext();
  const inputs = [
    {
      label: "참여인원",
      value: participants,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleParticipantsChange(e, setParticipants),
    },
    {
      label: "당첨 인원",
      value: numOfWinners,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleWinnersChange(e, setNumOfWinners),
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
