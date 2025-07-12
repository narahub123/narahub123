import { useEffect, useState } from "react";
import { GameBoard, GameControls } from "./components";
import { IFlipCard } from "./types";
import { createCards } from "./utils";

export const MemoryGame = () => {
  const [isGameOn, setIsGameOn] = useState(false);
  const [level, setLevel] = useState<number | "">("");
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [remainingPairs, setRemainingPairs] = useState(0);
  const [cards, setCards] = useState<IFlipCard[]>([]);

  // 레벨에 따른 카드 생성
  useEffect(() => {
    if (!level) return;

    const numOfCards = Math.pow(level * 2, 2);

    // 카드의 쌍의 개수
    const numOfPairs = numOfCards / 2;

    // 카드 정보 배열 생성하기
    const cards: IFlipCard[] = createCards(numOfPairs);

    setCards(cards);
    setRemainingPairs(numOfPairs);
  }, [level]);

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value === "" ? "" : Number(e.target.value);

    setLevel(level);
  };

  const handleGameStart = () => {
    if (!level || completedLevels.includes(level)) return;

    setIsGameOn(true);
  };

  const handleFlipCard = (card: IFlipCard) => {
    setCards((prev) => {
      const newCards = prev.map((c, idx) => {
        if (idx === card.index && !c.isFlipped) {
          return {
            ...c,
            isFlipped: true,
          };
        } else return c;
      });
      return newCards;
    });
  };

  return (
    <div className="w-screen h-screen">
      <GameControls
        isGameOn={isGameOn}
        level={level}
        completedLevels={completedLevels}
        remainingPairs={remainingPairs}
        handleLevelChange={handleLevelChange}
        handleGameStart={handleGameStart}
      />
      <GameBoard
        isGameOn={isGameOn}
        level={level}
        cards={cards}
        handleFlipCard={handleFlipCard}
      />
    </div>
  );
};
