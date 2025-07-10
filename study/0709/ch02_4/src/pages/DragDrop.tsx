import { DragEvent } from "react";

const DragDrop = () => {
  const onDragStart = (e: DragEvent<HTMLElement>) => {
    console.log("onDragStart", e.dataTransfer);
  };
  const onDragEnd = (e: DragEvent<HTMLElement>) => {
    console.log("onDragEnd", e.dataTransfer);
  };
  const onDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };
  const onDrop = (e: DragEvent<HTMLElement>) => {
    console.log("onDrop", e.dataTransfer);
  };
  return (
    <div>
      <p>DragDrop</p>
      <div draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <h1>Drag Me</h1>
      </div>
      <div onDrop={onDrop} onDragOver={onDragOver}>
        <h1>Drop Over Me</h1>
      </div>
    </div>
  );
};

export default DragDrop;
