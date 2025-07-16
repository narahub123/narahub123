import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BridgePos, Position } from "../types";
import { LADDER_HEIGHT } from "../constants";

export type LadderGameLadderContainerProps = {
  isStarted: boolean;
  participants: number;
  selectorPositions: Position[];
  bridges: BridgePos[];
};

export const LadderGameLadderContainer: FC<LadderGameLadderContainerProps> = ({
  isStarted,
  participants,
  selectorPositions,
  bridges,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rect, setRect] = useState<{ width: number; height: number } | null>(
    null
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    setRect({ width, height });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvasRef.current?.getContext("2d")!;

    // 캔버스 기본 설정
    // 기본 좌표계 크기 (논리 크기): 300px × 150px
    // CSS 표시 크기: 브라우저가 자동으로 맞춤
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // 좌표계와 실제 보여지는 크기를 일치시킴
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    function draw() {
      for (var i = 0; i < selectorPositions.length; i++) {
        const { centerX } = selectorPositions[i];
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#777";
        ctx.beginPath();
        ctx.moveTo(centerX - 18, 0);
        ctx.lineTo(centerX - 18, 300);
        ctx.stroke();
      }
    }

    function drawBridge() {
      for (var i = 0; i < bridges.length; i++) {
        const { from, to } = bridges[i];
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#777";
        ctx.beginPath();
        ctx.moveTo(from.centerX - 18, from.centerY);
        ctx.lineTo(to.centerX - 18, to.centerY);
        ctx.stroke();
      }
    }

    draw();
    drawBridge();
  }, [selectorPositions, participants, bridges]);

  console.log(bridges);

  const ladderHeight = `h-[${LADDER_HEIGHT}]px`;

  return (
    <div className={`w-full ${ladderHeight} relative`} ref={containerRef}>
      {/* <div
        className={`absolute top-0 left-0 w-full h-full bg-blue-400 transition-opacity duration-500 ${
          isStarted ? "opacity-0" : "opacity-100"
        }`}
      /> */}
      <canvas
        className="flex flex-row w-full h-full justify-evenly"
        style={{
          width: `${rect?.width}`,
          height: `${rect?.height}`,
        }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};
