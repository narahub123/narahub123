import { Title } from "../components/Texts";
import * as D from "../data";
import Card from "./Card";

const CardContainer = () => {
  const children = D.makeArray(10)
    .map(D.makeRandomCard)
    .map((card) => (
      <Card
        key={card.uuid}
        card={card}
        className="m-2 overflow-hidden text-xs border-2 shadow-lg rounded-xl"
        minWidth="30rem"
        width="30rem"
      />
    ));

  return (
    <section className="mt-4">
      <Title>CardContainer</Title>
      <div className="flex flex-wrap items-center justify-center p-4 mt-4">
        {children}
      </div>
    </section>
  );
};

export default CardContainer;
