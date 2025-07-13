import { forwardRef, useEffect, useState } from "react";
import { GameBoard, GameControls } from "./components";
import { IFlipCard } from "./types";
import { createCards } from "./utils";
import { useReposiveSize } from "./hooks";

export const MemoryGame = forwardRef<HTMLDivElement>(({}, ref) => {
  const [isGameOn, setIsGameOn] = useState(false);
  const [level, setLevel] = useState<number | "">("");
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [remainingPairs, setRemainingPairs] = useState(0);
  const [cards, setCards] = useState<IFlipCard[]>([]);
  const [openCards, setOpenCards] = useState<IFlipCard[]>([]);

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

  // 카드의 일치 여부 확인하기
  useEffect(() => {
    if (openCards.length !== 2) return;

    const timer = setTimeout(() => {
      const [card1, card2] = openCards;

      const openIndices = openCards.map((o) => o.index);

      if (card1.icon === card2.icon) {
        setRemainingPairs((prev) => prev - 1);
      } else {
        setCards((prev) => {
          const newCards = prev.map((c, idx) => {
            return openIndices.includes(idx)
              ? {
                  ...c,
                  isFlipped: false,
                }
              : c;
          });
          return newCards;
        });
      }

      setOpenCards([]);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [openCards]);

  // 게임 종료 확인
  useEffect(() => {
    if (remainingPairs > 0 || !level) return;

    setCompletedLevels((prev) => [...prev, level]);
    setLevel((prev) => {
      if (prev === "") return 1;
      if (prev === 4) return "";
      return prev + 1;
    });
    setIsGameOn(false);
  }, [remainingPairs]);

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value === "" ? "" : Number(e.target.value);

    setLevel(level);
  };

  const handleGameStart = () => {
    if (!level || completedLevels.includes(level)) return;

    setIsGameOn(true);
  };

  const handleFlipCard = (card: IFlipCard) => {
    // 두 장 초과의 카드 추가 막기
    if (openCards.length >= 2) return;

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

    // 열린 카드 배열에 추가
    setOpenCards((prev) => {
      if (prev.some((c) => c.index === card.index) || card.isFlipped)
        return prev;
      else return [...prev, card];
    });
  };

  const { width, height } = useReposiveSize({ aspectRatio: "3/4" });

  return (
    <div ref={ref} style={{ width, height }}>
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
});
