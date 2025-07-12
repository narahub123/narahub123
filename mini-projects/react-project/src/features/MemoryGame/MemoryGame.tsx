import { useState } from "react";
import { GameBoard, GameControls } from "./components";

export const MemoryGame = () => {
  const [isGameOn, setIsGameOn] = useState(false);
  return (
    <div className="w-screen h-screen">
      <GameControls isGameOn={isGameOn} />
      <GameBoard isGameOn={isGameOn} />
    </div>
  );
};
