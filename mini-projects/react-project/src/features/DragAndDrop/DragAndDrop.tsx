import { forwardRef, useState } from "react";
import { DropBox, ImagePreviewGrid } from "./components";
import { ImageType } from "./types";
import { useReposiveSize } from "../MemoryGame/hooks";

export const DragAndDrop = forwardRef<HTMLDivElement>(({}, ref) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [message, setMessage] = useState("");

  console.log(images);
  const { width, height } = useReposiveSize({ aspectRatio: "100 / 200" });

  return (
    <div
      className="p-4 bg-white rounded-xl"
      style={{ height, width }}
      ref={ref}
    >
      <DropBox
        setImages={setImages}
        images={images}
        message={message}
        setMessage={setMessage}
      />
      <ImagePreviewGrid images={images} />
    </div>
  );
});
