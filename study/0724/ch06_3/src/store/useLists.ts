import { useCallback, useMemo } from "react";
import { useListidOrdersStore } from "./useListidOrdersStore";
import { useListEntitiesStore } from "./useListEntitiesStore";
import { useListidCardidOrdersStore } from "./useListidCardidOrdersStore";
import { useCardEntitiesStore } from "./useCardEntitiesStore";
import { DropResult } from "@hello-pangea/dnd";
import * as U from "../utils";

export const useLists = () => {
  const listidOrders = useListidOrdersStore((state) => state.listidOrders);

  const uuids = useMemo(() => listidOrders, [listidOrders]);

  const listEntities = useListEntitiesStore((state) => state.listEntities);

  const lists = useMemo(
    () => uuids.map((uuid) => listEntities[uuid]),
    [uuids, listEntities]
  );

  const listidCardidOrders = useListidCardidOrdersStore(
    (state) => state.listidCardidOrders
  );

  const addListidToOrders = useListidOrdersStore(
    (state) => state.addListidToOrders
  );

  const addList = useListEntitiesStore((state) => state.addList);

  const setListidCardids = useListidCardidOrdersStore(
    (state) => state.setListidCardids
  );

  const onCreateList = useCallback(
    (uuid: string, title: string) => {
      const list = { uuid, title };

      addListidToOrders(list.uuid);
      addList(list);
      setListidCardids({ listid: list.uuid, cardids: [] });
    },
    [addListidToOrders, addList, setListidCardids]
  );

  const removeList = useListEntitiesStore((state) => state.removeList);

  const removeListidFromOrders = useListidOrdersStore(
    (state) => state.removeListidFromOrders
  );

  const removeCard = useCardEntitiesStore((state) => state.removeCard);

  const onRemoveList = useCallback(
    (listid: string) => {
      (listidCardidOrders[listid] ?? []).forEach((cardid) =>
        removeCard(
          cardid as `${string}-${string}-${string}-${string}-${string}`
        )
      );

      removeList(listid);
      removeListidFromOrders(listid);
    },
    [listidCardidOrders, removeCard, removeList, removeListidFromOrders]
  );

  const setListidOrders = useListidOrdersStore(
    (state) => state.setListidOrders
  );

  const onMoveList = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrders = listidOrders.map((item, index) =>
        index === dragIndex
          ? listidOrders[hoverIndex]
          : index === hoverIndex
          ? listidOrders[dragIndex]
          : item
      );

      setListidOrders(newOrders);
    },
    [listidOrders, setListidOrders]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log("onDragEnd result", result);

      const destinationListid = result.destination?.droppableId;
      const destinationCardIndex = result.destination?.index;
      if (destinationListid === undefined || destinationCardIndex === undefined)
        return;

      const sourceListid = result.source.droppableId;
      const sourceCardIndex = result.source.index;

      if (destinationListid === sourceListid) {
        const cardidOrders = listidCardidOrders[destinationListid];

        setListidCardids({
          listid: destinationListid,
          cardids: U.swapItemsInArray(
            cardidOrders,
            sourceCardIndex,
            destinationCardIndex
          ),
        });
      } else {
        const sourceCardidOrders = listidCardidOrders[sourceListid];

        setListidCardids({
          listid: sourceListid,
          cardids: U.removeItemAtIndexInArray(
            sourceCardidOrders,
            sourceCardIndex
          ),
        });

        const destinationCardidOrders =
          listidCardidOrders[destinationListid] ?? [];

        setListidCardids({
          listid: destinationListid,
          cardids: U.insertItemAtIndexInArray(
            destinationCardidOrders,
            destinationCardIndex,
            result.draggableId
          ),
        });
      }
    },
    [listidCardidOrders, setListidCardids]
  );

  return { lists, onCreateList, onRemoveList, onMoveList, onDragEnd };
};
