import { FC } from "react";
import { Masonry } from "../layouts";
import { cards } from "../data";
import { Card } from "./Card";

type CardsContainerProps = {};

const CardsContainer: FC<CardsContainerProps> = ({}) => {
  return (
    <Masonry>
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => {}} />
      ))}
    </Masonry>
  );
};

export default CardsContainer;
