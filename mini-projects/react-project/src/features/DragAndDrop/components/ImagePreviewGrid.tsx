import { FC } from "react";
import { ImageType } from "../types";

export type ImagePreviewGridProps = {
  images: ImageType[];
};

export const ImagePreviewGrid: FC<ImagePreviewGridProps> = ({ images }) => {
  return (
    <div className="grid w-full grid-cols-2">
      {images.map((image, index) => (
        <img key={`preview ${index}`} src={image.preview} className="w-fulll" />
      ))}
    </div>
  );
};
