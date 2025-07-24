import { useCallback, useMemo } from "react";
import { useListidOrdersStore } from "./useListidOrdersStore";
import { useListEntitiesStore } from "./useListEntitiesStore";
import { useListidCardidOrdersStore } from "./useListidCardidOrdersStore";
import { useCardEntitiesStore } from "./useCardEntitiesStore";

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

  const onCreateList = useCallback((uuid: string, title: string) => {
    const list = { uuid, title };

    addListidToOrders(list.uuid);
    addList(list);
    setListidCardids({ listid: list.uuid, cardids: [] });
  }, []);

  const removeList = useListEntitiesStore((state) => state.removeList);

  const removeListidFromOrders = useListidOrdersStore(
    (state) => state.removeListidFromOrders
  );

  const removeCard = useCardEntitiesStore((state) => state.removeCard);

  const onRemoveList = useCallback(
    (listid: string) => {
      listidCardidOrders[listid].forEach((cardid) =>
        removeCard(
          cardid as `${string}-${string}-${string}-${string}-${string}`
        )
      );

      removeList(listid);
      removeListidFromOrders(listid);
    },
    [listidCardidOrders]
  );

  return { lists, onCreateList, onRemoveList };
};
