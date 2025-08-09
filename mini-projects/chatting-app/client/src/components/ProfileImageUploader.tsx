import { FC } from "react";
import ImageUploader from "./ImageUploader";
import ProfileImage from "./ProfileImage";
import { useSignupStore } from "../stores";

const ProfileImageUploader: FC = () => {
  const image = useSignupStore((state) => state.user.profile_image);
  const setImage = useSignupStore((state) => state.setProfileImage);

  return (
    <div className="relative">
      <ImageUploader setImage={setImage} />
      <ProfileImage src={image?.preview || ""} />
    </div>
  );
};

export default ProfileImageUploader;
