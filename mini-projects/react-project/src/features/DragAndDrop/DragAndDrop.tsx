import { useState } from "react";
import { DropBox } from "./components";
import { ImageType } from "./types";

export const DragAndDrop = () => {
  const [images, setImages] = useState<ImageType[]>([]);

  console.log(images);

  return (
    <div className="w-[50%]">
      <DropBox setImages={setImages} images={images} />
      <div className="w-full">이미지 프리뷰</div>
    </div>
  );
};
