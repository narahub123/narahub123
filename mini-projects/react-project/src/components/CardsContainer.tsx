import { FC } from "react";
import { Card } from "../components";
import { Masonry } from "../layouts";
import { cards } from "../data";
import { useCardClickHandler } from "../hooks";

export const CardsContainer: FC = () => {
  const handleClick = useCardClickHandler({});

  return (
    <Masonry>
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={(e) => handleClick(e, card)} />
      ))}
    </Masonry>
  );
};
