import { useState } from "react";
import { GameBoard, GameControls } from "./components";

export const MemoryGame = () => {
  const [isGameOn, setIsGameOn] = useState(false);
  const [level, setLevel] = useState<number | "">("");
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value === "" ? "" : Number(e.target.value);

    setLevel(level);
  };

  const handleGameStart = () => {
    if (!level || completedLevels.includes(level)) return;

    setIsGameOn(true);
  };

  return (
    <div className="w-screen h-screen">
      <GameControls
        isGameOn={isGameOn}
        level={level}
        completedLevels={completedLevels}
        handleLevelChange={handleLevelChange}
        handleGameStart={handleGameStart}
      />
      <GameBoard isGameOn={isGameOn} />
    </div>
  );
};
