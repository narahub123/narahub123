import { Droppable } from "@hello-pangea/dnd";
import { FC, PropsWithChildren } from "react";

export type CardDroppableProps = {
  droppableId: string;
};

export const CardDroppable: FC<PropsWithChildren<CardDroppableProps>> = ({
  droppableId,
  children,
}) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex p-2 felx-col"
        >
          {children} {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
