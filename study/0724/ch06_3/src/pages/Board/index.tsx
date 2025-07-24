import { useCallback, useMemo } from "react";
import { ListDroppable, Title } from "../../components";
import { CreateListForm } from "./CreateListForm";
import { useLists } from "../../store";
import BoardList from "../BoardList";
import { DragDropContext } from "@hello-pangea/dnd";

export const Board = () => {
  const { lists, onRemoveList, onCreateList, onMoveList, onDragEnd } =
    useLists();

  const children = useMemo(
    () =>
      lists.map((list, index) => (
        <BoardList
          key={list.uuid}
          list={list}
          onRemoveList={() => {
            onRemoveList(list.uuid);
          }}
          index={index}
          onMoveList={onMoveList} // 아직 안함
        />
      )),
    [lists, onRemoveList]
  );

  return (
    <section className="mt-4">
      <Title>Board</Title>
      {/* 아직 안함 */}
      <DragDropContext onDragEnd={onDragEnd}>
        <ListDroppable className="flex flex-row p-2 mt-4">
          <div className="flex flex-wrap p-2 mt-4">
            {children}
            <CreateListForm onCreateList={onCreateList} />
          </div>
        </ListDroppable>
      </DragDropContext>
    </section>
  );
};
