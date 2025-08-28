import { FC } from "react";
import { LadderGameButton } from "./LadderGameButton";
import { LadderGameButtonType } from "../types";
import {
  useGameStart,
  useInitializeStates,
  useLadderGameContext,
} from "../hooks";
import { LadderGameType } from "../../../types";

export const LadderGameButtonContainer: FC = () => {
  const initializeStates = useInitializeStates();
  const handleGameStart = useGameStart();
  const { isStarted, gameType, setGameType } = useLadderGameContext();

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

  const handleGameType = (gameType: LadderGameType) => {
    if (isStarted) return;

    setGameType(gameType);
  };

  return (
    <div className="relative flex flex-row justify-between w-full mt-4">
      <div className="absolute flex justify-center w-full gap-2">
        <button
          className={`p-2 rounded-md text-white ${
            gameType === "winner"
              ? "bg-green-300 hover:bg-green-400"
              : "bg-gray-300 hover:bg-gray-400"
          } ${isStarted && "bg-gray-200 hover:bg-gray-200"}`}
          onClick={() => handleGameType("winner")}
          disabled={isStarted}
        >
          당첨
        </button>
        <button
          className={`p-2 rounded-md text-white ${
            gameType === "order"
              ? "bg-green-300 hover:bg-green-400"
              : "bg-gray-300 hover:bg-gray-400"
          } ${isStarted && "bg-gray-200 hover:bg-gray-200"}`}
          onClick={() => handleGameType("order")}
          disabled={isStarted}
        >
          순서
        </button>
      </div>
      {buttons.map((button) => {
        if (isStarted && button.text === "사다리 타기 시작") return null;
        return (
          <div key={button.text} className="z-10">
            <LadderGameButton button={button} />
          </div>
        );
      })}
    </div>
  );
};
