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

  const gridGap = {
    1: "gap-4",
    2: "gap-4",
    3: "gap-4",
    4: "gap-2",
  }[level];

  return (
    <main className={`grid w-full ${gridGap} ${gridCols} mt-4`}>
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
