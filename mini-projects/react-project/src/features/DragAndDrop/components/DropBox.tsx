import { FC, useRef, useState } from "react";

export type DropBoxProps = {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export const DropBox: FC<DropBoxProps> = ({ setImages }) => {
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) return;

    setImages(files);
  };

  return (
    <div
      className="flex items-center justify-center w-full border-2 border-blue-400 border-dashed cursor-pointer aspect-square rounded-2xl"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <p>사진을 드래그하세요.</p>
      <input
        type="file"
        className="hidden"
        hidden
        multiple
        accept="images/*"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
};
