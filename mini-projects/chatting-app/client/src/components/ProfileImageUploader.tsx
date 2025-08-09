import { FC } from "react";
import ImageUploader from "./ImageUploader";
import ProfileImage from "./ProfileImage";
import { useAuthStore } from "../stores";

const ProfileImageUploader: FC = () => {
  const image = useAuthStore((state) => state.signup.profile_image);
  const setImage = useAuthStore((state) => state.setProfileImage);

  return (
    <div className="relative">
      <ImageUploader setImage={setImage} />
      <ProfileImage src={image?.preview || ""} />
    </div>
  );
};

export default ProfileImageUploader;
