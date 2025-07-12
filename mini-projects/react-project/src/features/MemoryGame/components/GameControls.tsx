import { FC } from "react";
import { LevelSelector } from "./LevelSelector";

type GameControlsProps = {
  isGameOn: boolean;
  level: number | "";
  completedLevels: number[];
  handleLevelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const GameControls: FC<GameControlsProps> = ({
  isGameOn,
  level,
  completedLevels,
  handleLevelChange,
}) => {
  return (
    <header className="w-full">
      {isGameOn ? (
        <div className="flex items-center justify-between w-full">
          <span className="">남은 카드 쌍 개수</span>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <LevelSelector
            level={level}
            onChange={handleLevelChange}
            completedLevels={completedLevels}
          />
          <span className="">게임 시작 버튼</span>
        </div>
      )}
    </header>
  );
};
