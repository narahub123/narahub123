import { FC } from "react";
import ImageUploader from "./ImageUploader";
import ProfileImage from "./ProfileImage";
import { ImageType } from "../types";

interface ProfileImageUploaderProps {
  profileImage: ImageType | null;
  setProfileImage: (profileImage: ImageType) => void;
}

const ProfileImageUploader: FC<ProfileImageUploaderProps> = ({
  profileImage,
  setProfileImage,
}) => {
  return (
    <div className="relative">
      <ImageUploader setImage={setProfileImage} />
      <ProfileImage src={profileImage?.preview || ""} />
    </div>
  );
};

export default ProfileImageUploader;
