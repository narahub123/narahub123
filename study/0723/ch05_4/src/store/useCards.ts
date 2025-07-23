import { useCallback, useMemo } from "react";
import { useListidCardidOrdersStore } from "./useListidCardidOrdersStore";
import { useCardEntitiesStore } from "./useCardEntitiesStore";
import { UUID } from "../types";
import * as D from "../data";

export const useCards = (listid: UUID) => {
  const orders = useListidCardidOrdersStore(
    (state) => state.listidCardidOrders
  );

  const listidCardidOrders = useMemo(() => orders, [orders]);

  const cardEntities = useCardEntitiesStore((state) => state.cardEntities);

  const cards = useMemo(
    () =>
      listidCardidOrders[listid].map(
        (uuid) =>
          cardEntities[
            uuid as `${string}-${string}-${string}-${string}-${string}`
          ]
      ),
    [listidCardidOrders, cardEntities]
  );

  const addCard = useCardEntitiesStore((state) => state.addCard);

  const prependCardidToListid = useListidCardidOrdersStore(
    (state) => state.prependCardidToListid
  );

  const onPrependCard = useCallback(() => {
    const card = D.makeRandomCard();

    addCard(card);
    prependCardidToListid({ listid, cardid: card.uuid });
  }, [listid]);

  const appendCardidToListid = useListidCardidOrdersStore(
    (state) => state.appendCardidToListid
  );

  const onAppendCard = useCallback(() => {
    const card = D.makeRandomCard();

    addCard(card);
    appendCardidToListid({ listid, cardid: card.uuid });
  }, [listid]);

  const removeCard = useCardEntitiesStore((state) => state.removeCard);

  const removeCardidFromListid = useListidCardidOrdersStore(
    (state) => state.removeCardidFromListid
  );

  const onRemoveCard = useCallback(
    (uuid: UUID) => {
      removeCard(uuid as `${string}-${string}-${string}-${string}-${string}`);

      removeCardidFromListid({ listid, cardid: uuid });
    },
    [listid]
  );

  return { cards, onPrependCard, onAppendCard, onRemoveCard };
};
