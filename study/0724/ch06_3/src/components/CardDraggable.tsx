import { FC, PropsWithChildren } from "react";
import { Draggable } from "@hello-pangea/dnd";

export type CardDraggableProps = {
  draggableId: string;
  index: number;
};

export const CardDraggable: FC<PropsWithChildren<CardDraggableProps>> = ({
  children,
  draggableId,
  index,
}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};
