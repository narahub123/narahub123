import React, { useCallback } from "react";
import { Title } from "../../components";
import { CreateListForm } from "./CreateListForm";
import { useListEntitiesStore } from "../../store/useListEntitiesStore";
import { useListidOrdersStore } from "../../store";

export const Board = () => {
  const addListidToOrders = useListidOrdersStore(
    (state) => state.addListidToOrders
  );
  const addList = useListEntitiesStore((state) => state.addList);

  const onCreateList = useCallback((uuid: string, title: string) => {
    const list = { uuid, title };

    addListidToOrders(list.uuid);
    addList(list);
  }, []);

  return (
    <section className="mt-4">
      <Title>Board</Title>
      <div className="mt-4">
        <CreateListForm onCreateList={onCreateList} />
      </div>
    </section>
  );
};
