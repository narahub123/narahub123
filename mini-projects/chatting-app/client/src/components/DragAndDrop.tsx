import { FC, HTMLAttributes, PropsWithChildren, useRef } from "react";

type DivProps = HTMLAttributes<HTMLDivElement>;

type DragAndDropProps = DivProps & {
  isIn: boolean;
  setIsIn: React.Dispatch<React.SetStateAction<boolean>>;
  areValidFiles: (files: File[]) => boolean;
  storeFiles: (files: File[]) => void;
  className?: string;
};

const DragAndDrop: FC<PropsWithChildren<DragAndDropProps>> = ({
  children,
  isIn,
  setIsIn,
  className: _className,
  areValidFiles,
  storeFiles,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const className = `${isIn ? "outline outline-4 outline-blue-100" : ""} ${
    _className ?? ""
  }`;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);

    console.log(files);

    if (!files) return;

    // 유효성 검사 함수
    if (!areValidFiles(files)) return;

    // 파일을 저장하고 처리하는 함수
    storeFiles(files);
  };

  console.log(isIn);

  const handleDrageEnter = (e: React.DragEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    console.log(e.currentTarget);
    console.log(containerRef.current);

    setIsIn(true);
  };

  const handleDrageLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 💡 마우스 좌표가 실제로 드롭 영역 밖에 있는지 검사
    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (!rect) return;

    const isOutside =
      x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;

    if (isOutside) {
      setIsIn(false); // 진짜로 떠났을 때만
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDrageEnter}
      onDragLeave={handleDrageLeave}
      className={className}
      ref={containerRef}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
