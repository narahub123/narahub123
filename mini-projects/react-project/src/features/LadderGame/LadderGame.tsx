import { forwardRef, useState } from "react";
import { LadderGameControls, LadderGameGround } from "./components";
import { LadderGameProvider } from "./context/indext";
import { BridgePos, LadderGameContextType, Position } from "./types";
import { useReposiveSize } from "../MemoryGame/hooks";

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

  const { width, height } = useReposiveSize({ aspectRatio: "6/5" });

  return (
    <LadderGameProvider value={value}>
      <div
        className="flex flex-col items-center w-full p-4 bg-white rounded-lg"
        ref={ref}
        style={{
          width,
          height,
        }}
      >
        <LadderGameControls />
        <LadderGameGround />
      </div>
    </LadderGameProvider>
  );
});
