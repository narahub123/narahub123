import { FC, useRef, useState } from "react";
import { ImageType } from "../types";
import { InvalidMessage } from "./InvalidMessage";

export type DropBoxProps = {
  images: ImageType[];
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  quantity?: number;
  accept?: string;
  size?: number; // MB 단위
};

export const DropBox: FC<DropBoxProps> = ({
  images,
  setImages,
  quantity = 4,
  accept = "image/*",
  size = 5,
  message,
  setMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isIn, setIsIn] = useState(false);

  const MEGA_BYTE = 1048576;

  const handleFilesWithPreview = (
    files: File[],
    setImages: React.Dispatch<React.SetStateAction<ImageType[]>>
  ) => {
    for (const file of files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          setImages((prev) => [
            ...prev,
            { file, preview: e.target!.result as string },
          ]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const isValidFiles = (
    files: File[],
    prevFiles: ImageType[],
    quantity: number,
    accept: string,
    size: number
  ): boolean => {
    const combinedFiles: any[] = [...prevFiles, ...files];

    if (!isValidFileQuantity(combinedFiles, quantity)) {
      setMessage(`최대 ${quantity}개까지 업로드 가능합니다.`);

      return false;
    }

    const inValidFiles: File[] = files.filter(
      (file) => !isValidFileType(file, accept) || !isValidFileSize(file, size)
    );

    if (inValidFiles.length > 0) {
      return false;
    }

    return true;
  };

  // 파일 업로드 개수 필터링
  const isValidFileQuantity = (files: File[], quantity: number): boolean => {
    return files.length <= quantity;
  };

  // 파일 형식 확인하기
  const isValidFileType = (file: File, accept: string): boolean => {
    // 쉼표를 기준으로 문자열을 분해 => accept은 쉼표로 여러 지정자를 구분함
    const specifiers: string[] = accept
      .split(",")
      .map((s) => s.trim().toLowerCase());

    for (const specifier of specifiers) {
      // 파일 유형 지정자가 .로 시작하는 경우: name이 해당 지정자로 끝나는지 확인함 : 확장자 검사
      if (specifier.startsWith(".")) {
        if (file.name.toLowerCase().endsWith(specifier)) return true;
      } else if (specifier.endsWith("/*")) {
        // 파일 유형 지정자가 /*로 끝나는 경우 : MIME 그룹 검사
        if (
          file.type
            .toLowerCase()
            .startsWith(specifier.slice(0, specifier.length - 1))
        )
          return true;
      } else {
        //  MIME 형식
        if (file.type.toLowerCase() === specifier) return true;
      }
    }

    setMessage("형식에 맞지 않은 파일입니다.");
    return false;
  };

  // 파일 크기 검사
  const isValidFileSize = (file: File, size: number): boolean => {
    const fileSize = file.size;

    if (fileSize > size * MEGA_BYTE) {
      setMessage(`${size}MB이상은 올릴 수 없습니다.`);
    }

    return fileSize <= size * MEGA_BYTE;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsIn((prev) => (prev !== true ? true : prev));
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsIn((prev) => (prev !== false ? false : prev));
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);

    if (!isValidFiles(files, images, quantity, accept, size)) return;

    handleFilesWithPreview(files, setImages);

    setIsIn((prev) => (prev !== false ? false : prev));
  };

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) return;

    if (!isValidFiles(files, images, quantity, accept, size)) return;

    handleFilesWithPreview(files, setImages);
  };

  return (
    <div
      className="relative flex items-center justify-center w-full border-2 border-blue-400 border-dashed cursor-pointer aspect-square rounded-2xl"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <InvalidMessage message={message} setMessage={setMessage} />
      <p>사진을 드래그하세요.</p>
      <input
        type="file"
        className="hidden"
        hidden
        multiple
        accept="images/*"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
};
