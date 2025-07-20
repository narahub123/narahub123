import { CSSProperties, FC } from "react";
import { CardData } from "../types";
import { Icon } from "./Icon";
import { getRandomColor } from "../utils";

type CardProps = {
  card: CardData;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    card: CardData
  ) => void;
  style?: CSSProperties;
};

export const Card: FC<CardProps> = ({ card, onClick, style }) => {
  const { skill, icon, name, height = 6 } = card;

  const rowSpanClass = {
    6: "row-span-6",
    7: "row-span-7",
    8: "row-span-8",
    9: "row-span-9",
    10: "row-span-10",
  }[height > 10 ? 10 : height];

  return (
    <button
      className={`
        ${rowSpanClass}
        w-full
        rounded-2xl
        border
        p-4
        shadow-md
        transition
        duration-200
        hover:shadow-xl
        hover:scale-[1.015]
        flex
        flex-col
        items-center
        justify-center
        gap-3
        text-white
      `}
      id="card"
      style={{ backgroundColor: getRandomColor(), ...style }}
      onClick={(e) => onClick(e, card)}
    >
      <p className="font-bold uppercase text-md">{skill}</p>
      <Icon iconName={icon} className="text-5xl" />
      <p className="text-xl font-bold">{name}</p>
    </button>
  );
};
