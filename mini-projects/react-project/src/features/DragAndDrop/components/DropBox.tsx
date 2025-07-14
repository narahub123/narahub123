import { FC } from "react";

export type DropBoxProps = {};

export const DropBox: FC<DropBoxProps> = ({}) => {
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {};
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {};
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {};
  return (
    <div className="flex items-center justify-center w-full border-2 border-blue-400 border-dashed aspect-square">
      <p>여기에 드래그 해라</p>
    </div>
  );
};
