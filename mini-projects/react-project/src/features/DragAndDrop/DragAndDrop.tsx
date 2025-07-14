import { useState } from "react";
import { DropBox } from "./components";

export const DragAndDrop = () => {
  const [images, setImages] = useState<File[]>([]);
  return (
    <div className="w-[50%]">
      <DropBox setImages={setImages} />
      <div className="w-full">이미지 프리뷰</div>
    </div>
  );
};
