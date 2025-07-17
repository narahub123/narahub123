import { forwardRef, useState } from "react";
import { LadderGameControls, LadderGameGround } from "./components";

export const LadderGame = forwardRef<HTMLDivElement>(({}, ref) => {
  const [participants, setParticipants] = useState(1);
  const [numOfWinners, setNumOfWinners] = useState(1);
  const [winners, setWinnners] = useState<boolean[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  // 당첨자 추첨
  const generateWinners = () => {
    const arr = Array.from({ length: participants }).map(Boolean);

    let i = 0;

    while (arr.filter((b) => b === true).length < numOfWinners) {
      const result = Math.floor(Math.random() * 2);

      arr[i] = result === 0 ? false : true;

      if (i === arr.length - 1) {
        i = 0;
      } else {
        i++;
      }
    }

    setWinnners(arr);
  };

  // 게임 시작 시
  // 장막 제거
  // 당첨 번호 뽑기
  const handleGameStart = () => {
    setIsStarted((prev) => (prev === false ? true : prev));
    generateWinners();
  };

  const initializeData = () => {
    setParticipants(1);
    setNumOfWinners(1);
    setIsStarted((prev) => (prev === true ? false : prev));
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setParticipants(parseInt(e.target.value));

  const handleWinnersChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNumOfWinners(parseInt(e.target.value));

  return (
    <div
      className="flex flex-col items-center w-full p-4 bg-white rounded-lg"
      ref={ref}
      style={{
        maxWidth: 800,
        width: `${window.innerWidth * 0.8}px`,
        height: "580px",
      }}
    >
      <LadderGameControls
        participants={participants}
        numOfWinners={numOfWinners}
        handleParticipantsChange={handleParticipantsChange}
        handleWinnersChange={handleWinnersChange}
        handleGameStart={handleGameStart}
        initializeData={initializeData}
        disabled={isStarted}
      />
      <LadderGameGround
        isStarted={isStarted}
        participants={participants}
        winners={winners}
      />
    </div>
  );
});
