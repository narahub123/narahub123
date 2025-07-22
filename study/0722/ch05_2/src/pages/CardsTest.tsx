import { Icon, Title } from "../components";
import Card from "./CardsTest/Card";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as C from "../store/cards";
import * as D from "../data";
import { useCallback, useEffect, useMemo } from "react";

const makeCard = () =>
  D.makeCard(
    D.randomUUID(),
    D.makeRandomUser(),
    D.randomImage(200, 100),
    "",
    "",
    "",
    ""
  );

export const CardsTest = () => {
  const dispatch = useDispatch();

  const cards = useSelector<AppState, C.State>(({ cards }) => cards);

  const addCard = useCallback(() => {
    dispatch(C.addCard(makeCard()));
  }, [dispatch]);

  const removeCard = useCallback(
    (id: string) => () => dispatch(C.removeCard(id)),
    [dispatch]
  );

  const children = useMemo(
    () =>
      cards.map((card) => (
        <Card key={card.uuid} card={card} onRemove={removeCard(card.uuid)} />
      )),
    [cards, removeCard]
  );

  useEffect(addCard, [addCard]);

  return (
    <section className="mt-4">
      <Title>CardsTest</Title>
      <div className="flex justify-center mt-4">
        <Icon name="add" className="btn-primary" onClick={addCard} />
      </div>
      <div className="flex flex-wrap mt-4">{children}</div>
    </section>
  );
};
