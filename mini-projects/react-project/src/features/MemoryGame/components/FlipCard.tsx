import { FC } from "react";
import { IFlipCard } from "../types";
import { useCardFontSize } from "../hooks";

type FlipCardProps = {
  card: IFlipCard;
  level: number;
  onClick: (card: IFlipCard) => void;
};

export const FlipCard: FC<FlipCardProps> = ({ card, onClick, level }) => {
  const { index, icon, isFlipped } = card;

  const fontSize = useCardFontSize(level * 2);

  return (
    <button
      className={`relative w-full aspect-square rounded-lg  transition-transform duration-500 shadow-lg`}
      style={{
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
      onClick={() => onClick(card)}
    >
      {/* 앞면 */}
      <div
        className="absolute inset-0 flex items-center justify-center w-full h-full bg-white border border-gray-300 rounded-lg"
        style={{
          backfaceVisibility: "hidden",
          fontSize,
        }}
      >
        {index + 1}
      </div>

      {/* 뒷면 */}
      <div
        className="absolute inset-0 flex items-center justify-center w-full h-full bg-blue-300 border border-gray-300 rounded-lg"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          fontSize,
        }}
      >
        {icon}
      </div>
    </button>
  );
};
