import { useState } from "react";
import { LadderGameControls, LadderGameGround } from "./components";

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

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setParticipants(parseInt(e.target.value));

  const handleWinnersChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWinners(parseInt(e.target.value));

  return (
    <div className="flex flex-col items-center w-screen h-screen p-4">
      <LadderGameControls
        participants={participants}
        winners={winners}
        handleParticipantsChange={handleParticipantsChange}
        handleWinnersChange={handleWinnersChange}
        handleGameStart={handleGameStart}
        initializeData={initializeData}
        disabled={isStarted}
      />
      <LadderGameGround isStarted={isStarted} participants={participants} />
    </div>
  );
};
