import { useState } from "react";
import { DropBox, ImagePreviewGrid } from "./components";
import { ImageType } from "./types";

export const DragAndDrop = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [message, setMessage] = useState("");

  console.log(images);

  return (
    <div className="w-[50%] p-4">
      <DropBox
        setImages={setImages}
        images={images}
        message={message}
        setMessage={setMessage}
      />
      <ImagePreviewGrid images={images} />
    </div>
  );
};
