import { FC } from "react";
import { IFlipCard } from "../types";
import { FlipCard } from "./FlipCard";

type GameBoardProps = {
  isGameOn: boolean;
  level: number | "";
  cards: IFlipCard[];
  handleFlipCard: (card: IFlipCard) => void;
};

export const GameBoard: FC<GameBoardProps> = ({
  isGameOn,
  level,
  cards,
  handleFlipCard,
}) => {
  if (!isGameOn || !level) return null;

  const gridCols = {
    1: "grid-cols-2",
    2: "grid-cols-4",
    3: "grid-cols-6",
    4: "grid-cols-8",
  }[level];

  return (
    <main className={`grid w-full gap-4 ${gridCols} mt-4 p-4`}>
      {cards.map((card) => {
        return (
          <FlipCard
            card={card}
            key={card.index}
            onClick={handleFlipCard}
            level={level}
          />
        );
      })}
    </main>
  );
};
