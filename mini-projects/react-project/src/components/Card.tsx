import { FC } from "react";
import { CardData } from "../types";
import { Icon } from "./Icon";

type CardProps = {
  card: CardData;
};

export const Card: FC<CardProps> = ({ card }) => {
  const { skill, icon, name, height = 4 } = card;

  const rowSpanClass = {
    4: "row-span-4",
    5: "row-span-5",
    6: "row-span-6",
    7: "row-span-7",
    8: "row-span-8",
    9: "row-span-9",
    10: "row-span-10",
  }[height > 10 ? 10 : height];

  return (
    <button className={`w-full border rounded-md ${rowSpanClass} shadow-md`}>
      <p>{skill}</p>
      <Icon iconName={icon} className="text-3xl" />
      <p>{name}</p>
    </button>
  );
};
