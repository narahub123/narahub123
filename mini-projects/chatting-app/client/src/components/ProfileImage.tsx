import { FC } from "react";

type ProfileImageProps = {
  src: string;
  size?: number;
};

const ProfileImage: FC<ProfileImageProps> = ({ src, size = 100 }) => {
  // 기본 프로필 이미지
  const defaultProfileImage = process.env.PUBLIC_URL + "/images/profile.webp";

  return (
    <div>
      <img
        src={src || defaultProfileImage}
        alt="프로필 이미지"
        className="rounded-full"
        style={{ width: size, aspectRatio: 1 / 1, objectFit: "cover" }}
      />
    </div>
  );
};

export default ProfileImage;
