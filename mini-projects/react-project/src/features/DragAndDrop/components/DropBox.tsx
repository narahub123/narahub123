import { FC, useState } from "react";

export type DropBoxProps = {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export const DropBox: FC<DropBoxProps> = ({ setImages }) => {
  const [isIn, setIsIn] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsIn((prev) => (prev !== true ? true : prev));
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsIn((prev) => (prev !== false ? false : prev));
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);

    setImages((prev) => [...prev, ...files]);

    setIsIn((prev) => (prev !== false ? false : prev));
  };

  return (
    <div
      className="flex items-center justify-center w-full border-2 border-blue-400 border-dashed aspect-square"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>여기에 드래그 해라</p>
    </div>
  );
};
