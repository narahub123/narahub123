// 유효한 파일 개수
export const isValidFileCount = (files: any[], maxCount: number): boolean =>
  files.length <= maxCount;

// 유효한 파일 형식
export const isValidFileType = (file: File, accept: string): boolean => {
  // 쉼표를 기준으로 문자열을 분해 : accept는 쉼표를 기준으로 지정자를 구분함
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
  return false;
};

// 유효한 파일 크기
export const isValidFileSize = (file: File, maxSize: number): boolean =>
  file.size <= maxSize;

export const areValidFiles = (
  files: File[],
  prevFiles: any[],
  maxCount: number,
  accept: string,
  maxSize: number
) => {
  const totalFiles: any[] = [...prevFiles, files];

  // 총 파일 개수 유효성 검사: maxCount가 1인 경우 필요없음
  if (!isValidFileCount(totalFiles, maxCount)) return false;

  // 파일 타입 유효성 검사
  let invalidFiles: File[] = files.filter(
    (file) => !isValidFileType(file, accept)
  );

  if (invalidFiles.length > 0) return false;

  // 파일 크기 유효성 검사
  invalidFiles = files.filter((file) => !isValidFileSize(file, maxSize));

  if (invalidFiles.length > 0) return false;

  return true;
};

export const storeFilesWithPreview = (
  files: File[],
  setImages: React.Dispatch<React.SetStateAction<any[]>>
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
