import { useState } from "react";

export const LadderGame = () => {
  const [participants, setParticipants] = useState(1);
  const [winners, setWinners] = useState(1);
  const [isStarted, setIsStarted] = useState(false);

  // 게임 시작 시
  // 장막 제거
  // 당첨 번호 뽑기
  const handleGameStart = () => {
    setIsStarted((prev) => (prev === false ? true : prev));
  };

  const initializeData = () => {
    setParticipants(1);
    setWinners(1);
    setIsStarted((prev) => (prev === true ? false : prev));
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen p-4">
      <div className="w-full">
        <div className="flex flex-row justify-center w-full gap-4">
          <div className="flex items-center justify-center w-full gap-4">
            <p>참여 인원</p>
            <input
              type="number"
              min={1}
              max={10}
              className="p-2 border-2"
              value={participants}
              placeholder="참여자 수"
              onChange={(e) => setParticipants(parseInt(e.target.value))}
              disabled={isStarted}
            />
          </div>
          <div className="flex items-center justify-center w-full gap-4">
            <p>당첨 인원</p>
            <input
              type="number"
              min={1}
              max={participants}
              className="p-2 border-2"
              value={winners}
              placeholder="당첨자 수"
              onChange={(e) => setWinners(parseInt(e.target.value))}
              disabled={isStarted}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-4">
          <button
            className="px-4 py-2 text-white bg-red-400 rounded-lg hover:bg-red-500"
            onClick={initializeData}
          >
            초기화
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500"
            onClick={handleGameStart}
          >
            사다리 타기 시작
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 mt-4">
        <div className="flex flex-row w-full justify-evenly">
          {Array.from({ length: participants }).map((_, index) => (
            <div
              className="relative w-10 aspect-square"
              key={`participant-${index}`}
            >
              <button
                className={`absolute top-0 left-0 w-10 border-2 rounded-full aspect-square ${
                  isStarted ? "hover:scale-110" : ""
                }`}
                disabled={!isStarted} // 시작전에는 클릭 금지
              >
                {index + 1}
              </button>
            </div>
          ))}
        </div>
        <div className="w-full h-[300px] relative">
          <div
            className={`absolute top-0 left-0 w-full h-full bg-blue-400 transition-opacity duration-500 ${
              isStarted ? "opacity-0" : "opacity-100"
            }`}
          />
          <div className="flex flex-row w-full h-full justify-evenly">
            {Array.from({ length: participants }).map((_, index) => (
              <div
                className="flex items-center justify-center w-10 h-full border-2"
                key={`ladder-${index}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row w-full justify-evenly">
          {Array.from({ length: participants }).map((_, index) => (
            // 게임이 시작되면 당첨과 꽝으로 변경되어야 함
            // transition 적용 가능? 두 컴포넌트 사이의 overlay
            // 위의 버튼 처럼 wrapper 필요함
            <div
              className="flex items-center justify-center w-10 border-2 rounded-full aspect-square"
              key={`winner-${index}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
