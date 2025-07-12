import { FC } from "react";
import { LevelSelector, RemainingPairs, StartButton } from "../components";

type GameControlsProps = {
  isGameOn: boolean;
  level: number | "";
  completedLevels: number[];
  remainingPairs: number;
  handleLevelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleGameStart: () => void;
};

export const GameControls: FC<GameControlsProps> = ({
  isGameOn,
  level,
  completedLevels,
  remainingPairs,
  handleLevelChange,
  handleGameStart,
}) => {
  return (
    <header className="w-full">
      {isGameOn ? (
        <div className="flex items-center justify-between w-full">
          <RemainingPairs remainingPairs={remainingPairs} />
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <LevelSelector
            level={level}
            onChange={handleLevelChange}
            completedLevels={completedLevels}
          />
          <div className="flex flex-col">
            <StartButton
              disabled={!level || completedLevels.includes(level)}
              onClick={handleGameStart}
            />
            {!level && (
              <p className="mt-1 text-sm text-red-500">레벨을 선택해주세요.</p>
            )}
            {level && completedLevels.includes(level) && (
              <p className="mt-1 text-sm text-red-500">
                이미 완료한 레벨입니다.
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
