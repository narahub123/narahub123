import { forwardRef, useState } from "react";
import { LadderGameControls, LadderGameGround } from "./components";
import { LadderGameProvider } from "./context/indext";
import { BridgePos, LadderGameContextType, Position } from "./types";
import {
  generateWinners,
  handleParticipantsChange,
  handleWinnersChange,
} from "./utils";

export const LadderGame = forwardRef<HTMLDivElement>(({}, ref) => {
  const [participants, setParticipants] = useState(1);
  const [numOfWinners, setNumOfWinners] = useState(1);
  const [winners, setWinners] = useState<boolean[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [selectorPositions, setSelectorPositions] = useState<Position[]>([]);
  const [bridges, setBridges] = useState<BridgePos[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selected, setSelected] = useState(-1);
  const [paths, setPaths] = useState<Position[]>([]);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [pathCanvas, setPathCanvas] = useState<HTMLCanvasElement | null>(null);
  const [rect, setRect] = useState<{ width: number; height: number } | null>(
    null
  );

  const value: LadderGameContextType = {
    participants,
    setParticipants,
    numOfWinners,
    setNumOfWinners,
    winners,
    setWinners,
    isStarted,
    setIsStarted,
    selectorPositions,
    setSelectorPositions,
    bridges,
    setBridges,
    positions,
    setPositions,
    selected,
    setSelected,
    paths,
    setPaths,
    canvas,
    setCanvas,
    rect,
    setRect,
    pathCanvas,
    setPathCanvas,
  };

  // 게임 시작 시
  // 장막 제거
  // 당첨 번호 뽑기
  const handleGameStart = () => {
    setIsStarted((prev) => (prev === false ? true : prev));
    generateWinners(participants, numOfWinners, setWinners);
  };

  // 초기화 => 캔버스 초기화 구현 방법
  const initializeData = () => {
    setParticipants(1);
    setNumOfWinners(1);
    setWinners([]);
    setIsStarted((prev) => (prev === true ? false : prev));
    setBridges([]);
    setPaths([]);
    setSelected(-1);
    setPositions([]);
    setSelectorPositions([]);
    if (canvas && rect) {
      const ctx = canvas.getContext("2d");

      ctx?.clearRect(0, 0, rect.width, rect.height);
    }
    if (pathCanvas && rect) {
      const ctx = pathCanvas.getContext("2d");

      ctx?.clearRect(0, 0, rect.width, rect.height);
    }
  };

  return (
    <LadderGameProvider value={value}>
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
          handleGameStart={handleGameStart}
          initializeData={initializeData}
        />
        <LadderGameGround />
      </div>
    </LadderGameProvider>
  );
});
