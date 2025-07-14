import { useState } from "react";
import { DropBox, ImagePreviewGrid } from "./components";
import { ImageType } from "./types";

export const DragAndDrop = () => {
  const [images, setImages] = useState<ImageType[]>([]);

  console.log(images);

  return (
    <div className="w-[50%]">
      <DropBox setImages={setImages} images={images} />
      <ImagePreviewGrid images={images} />
    </div>
  );
};
