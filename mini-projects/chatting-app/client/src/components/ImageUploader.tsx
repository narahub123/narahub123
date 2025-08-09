import { FC, useRef } from "react";
import Icon from "./Icon";
import { ImageType } from "../types";

type ImageUploaderProps = {
  setImage: (value: ImageType) => void;
};

const ImageUploader: FC<ImageUploaderProps> = ({ setImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 클릭 함수
  const handleClick = () => {
    if (!inputRef.current) return;

    const input = inputRef.current;

    input.click();
  };

  // 이미지 추가 함수: 유효성 검사 추가 필요
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      if (files[0]) {
        console.log(e.target!.result as string);
        setImage({
          file: files[0],
          preview: e.target!.result as string,
        });
      }
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <div>
      <input
        type="file"
        name="profile_image"
        id="profile_image"
        className="border p-2"
        hidden
        ref={inputRef}
        onChange={handleOnChange}
      />
      <div
        className="absolute cursor-pointer w-full h-full flex justify-center items-center text-white opacity-50 hover:opacity-80"
        onClick={handleClick}
      >
        <Icon name="photo_camera" className="text-5xl" />
      </div>
    </div>
  );
};

export default ImageUploader;
