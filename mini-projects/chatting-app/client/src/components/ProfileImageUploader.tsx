import React, { FC, useState } from "react";
import ImageUploader from "./ImageUploader";
import ProfileImage from "./ProfileImage";
import { ImageType } from "../types";

const ProfileImageUploader: FC = () => {
  const [image, setImage] = useState<ImageType | null>(null);

  return (
    <div className="relative">
      <ImageUploader setImage={setImage} />
      <ProfileImage src={image?.preview || ""} />
    </div>
  );
};

export default ProfileImageUploader;
