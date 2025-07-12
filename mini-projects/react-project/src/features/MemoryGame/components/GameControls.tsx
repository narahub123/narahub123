import { FC } from "react";

type GameControlsProps = {
  isGameOn: boolean;
};

export const GameControls: FC<GameControlsProps> = ({ isGameOn }) => {
  return (
    <header className="w-full">
      {isGameOn ? (
        <div className="flex items-center justify-between w-full">
          <span className="">남은 카드 쌍 개수</span>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <span className="">레벨 선택</span>
          <span className="">게임 시작 버튼</span>
        </div>
      )}
    </header>
  );
};
