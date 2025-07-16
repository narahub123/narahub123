import { FC, useEffect, useRef } from "react";

export type LadderGameSelectorProps = {
  index: number;
  isStarted: boolean;
};

export const LadderGameSelector: FC<LadderGameSelectorProps> = ({
  index,
  isStarted,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const getButtonCenterPosition = () => {
      if (!buttonRef.current) return;

      // 버튼의 위치 가져오기
      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      console.log("버튼 중앙 위치", centerX, centerY);
    };

    // 초기 값
    getButtonCenterPosition();

    // resize 시 
    window.addEventListener("resize", getButtonCenterPosition);

    return () => window.removeEventListener("resize", getButtonCenterPosition);
  }, []);

  return (
    <div className="relative w-10 aspect-square" key={`participant-${index}`}>
      <button
        className={`absolute top-0 left-0 w-10 border-2 rounded-full aspect-square ${
          isStarted ? "hover:scale-110" : ""
        }`}
        disabled={!isStarted} // 시작전에는 클릭 금지
        ref={buttonRef}
      >
        {index + 1}
      </button>
    </div>
  );
};
