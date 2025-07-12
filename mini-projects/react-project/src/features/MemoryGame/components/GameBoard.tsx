import { FC } from "react";

type GameBoardProps = {
  isGameOn: boolean;
};

export const GameBoard: FC<GameBoardProps> = ({ isGameOn }) => {
  if (!isGameOn) return null;

  return <main className="w-full">게임판</main>;
};
