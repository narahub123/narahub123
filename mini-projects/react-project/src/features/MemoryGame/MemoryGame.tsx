import { useState } from "react";

export const MemoryGame = () => {
  const [isGameOn, setIsGameOn] = useState(false);
  return (
    <div className="w-screen h-screen">
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
      <main className="w-full">게임판</main>
    </div>
  );
};
