import { FC } from "react";
import { CardData } from "../types";

type CardProps = {
  card: CardData;
};

export const Card: FC<CardProps> = ({ card }) => {
  const { skill, icon, name, height = 4 } = card;

  const rowSpanClass = {
    3: "row-span-3",
    4: "row-span-4",
    5: "row-span-5",
    6: "row-span-6",
    7: "row-span-7",
    8: "row-span-8",
    9: "row-span-9",
  }[height ?? 4];

  return (
    <button className={`w-full border rounded-md ${rowSpanClass} shadow-md`}>
      <p>{skill}</p>
      <p>{icon}</p>
      <p>{name}</p>
    </button>
  );
};
