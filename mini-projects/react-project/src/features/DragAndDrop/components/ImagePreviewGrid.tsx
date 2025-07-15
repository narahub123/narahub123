import { FC } from "react";
import { ImageType } from "../types";

export type ImagePreviewGridProps = {
  images: ImageType[];
};

export const ImagePreviewGrid: FC<ImagePreviewGridProps> = ({ images }) => {
  return (
    <div className="grid w-full grid-cols-2 mt-4 overflow-y-auto aspect-square">
      {images.map((image, index) => (
        <img key={`preview ${index}`} src={image.preview} className="w-fulll" />
      ))}
    </div>
  );
};
