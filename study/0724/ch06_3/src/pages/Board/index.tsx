import React, { useCallback, useMemo } from "react";
import { Title } from "../../components";
import { CreateListForm } from "./CreateListForm";
import { useListEntitiesStore, useListidOrdersStore } from "../../store";
import BoardList from "../BoardList";

export const Board = () => {
  const listidOrders = useListidOrdersStore((state) => state.listidOrders);

  // 먼저 listidOrders를 기반으로 uuid 배열을 memo
  const uuids = useMemo(() => listidOrders, [listidOrders]);

  // 이 상태에서 store 내부 접근은 한 번만 하도록 구조 변경
  const listEntities = useListEntitiesStore((state) => state.listEntities);

  const lists = useMemo(
    () => uuids.map((uuid) => listEntities[uuid]),
    [uuids, listEntities]
  );

  const addListidToOrders = useListidOrdersStore(
    (state) => state.addListidToOrders
  );

  const removeListidFromOrders = useListidOrdersStore(
    (state) => state.removeListidFromOrders
  );

  const addList = useListEntitiesStore((state) => state.addList);

  const removeList = useListEntitiesStore((state) => state.removeList);

  const onCreateList = useCallback((uuid: string, title: string) => {
    const list = { uuid, title };

    addListidToOrders(list.uuid);
    addList(list);
  }, []);

  const onRemoveList = useCallback((listid: string) => {
    removeList(listid);
    removeListidFromOrders(listid);
  }, []);

  const children = useMemo(
    () =>
      lists.map((list) => (
        <BoardList
          key={list.uuid}
          list={list}
          onRemoveList={() => {
            onRemoveList(list.uuid);
          }}
        />
      )),
    [lists, onRemoveList]
  );

  return (
    <section className="mt-4">
      <Title>Board</Title>
      <div className="flex flex-wrap p-2 mt-4">
        {children}
        <CreateListForm onCreateList={onCreateList} />
      </div>
    </section>
  );
};
