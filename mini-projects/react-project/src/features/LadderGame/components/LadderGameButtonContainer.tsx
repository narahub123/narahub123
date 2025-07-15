import { FC } from "react";
import { LadderGameButton } from "./LadderGameButton";
import { LadderGameButtonType } from "../types";

export type LadderGameButtonContainerProps = {
  handleGameStart: () => void;
  initializeData: () => void;
};

export const LadderGameButtonContainer: FC<LadderGameButtonContainerProps> = ({
  handleGameStart,
  initializeData,
}) => {
  const buttons: LadderGameButtonType[] = [
    {
      text: "초기화",
      onClick: initializeData,
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
      {buttons.map((button) => (
        <div>
          <LadderGameButton button={button} />
        </div>
      ))}
    </div>
  );
};
