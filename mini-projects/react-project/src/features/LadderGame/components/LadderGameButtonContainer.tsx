import { FC } from "react";
import { LadderGameButton } from "./LadderGameButton";
import { LadderGameButtonType } from "../types";
import {
  useGameStart,
  useInitializeStates,
  useLadderGameContext,
} from "../hooks";

export const LadderGameButtonContainer: FC = () => {
  const initializeStates = useInitializeStates();
  const handleGameStart = useGameStart();
  const { isStarted } = useLadderGameContext();

  const buttons: LadderGameButtonType[] = [
    {
      text: "초기화",
      onClick: initializeStates,
      color: "warning",
    },
    {
      text: "사다리 타기 시작",
      onClick: handleGameStart,
      color: "primary",
    },
  ];

  return (
    <div className="flex flex-row justify-between w-full mt-4">
      {buttons.map((button) => {
        if (isStarted && button.text === "사다리 타기 시작") return null;
        return (
          <div key={button.text}>
            <LadderGameButton button={button} />
          </div>
        );
      })}
    </div>
  );
};
