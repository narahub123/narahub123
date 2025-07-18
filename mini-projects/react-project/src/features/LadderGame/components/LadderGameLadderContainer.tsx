import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LADDER_HEIGHT } from "../constants";
import { useLadderGameContext } from "../hooks";

export type LadderGameLadderContainerProps = {};

export const LadderGameLadderContainer: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<HTMLCanvasElement>(null);

  const {
    isStarted,
    participants,
    selectorPositions,
    bridges,
    paths,
    rect,
    setRect,
    setCanvas,
    setPathCanvas,
  } = useLadderGameContext();

  // 컴포넌트 크기 측정
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    setRect({ width, height });
  }, []);

  // 사다리 그리기
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
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, 300);
        ctx.stroke();
      }
    }

    function drawBridge() {
      for (var i = 0; i < bridges.length; i++) {
        const { from, to } = bridges[i];
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#777";
        ctx.beginPath();
        ctx.moveTo(from.centerX, from.centerY);
        ctx.lineTo(to.centerX, to.centerY);
        ctx.stroke();
      }
    }
    draw();
    drawBridge();
    setCanvas(canvas);
  }, [selectorPositions, participants, bridges]);

  // 경로 그리기
  useEffect(() => {
    if (paths.length === 0) return;
    console.log(paths);
    if (!pathRef.current) return;
    const canvas = pathRef.current;
    const ctx = pathRef.current?.getContext("2d")!;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    function drawPath() {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "red";

      ctx.beginPath();

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        if (i === 0) {
          ctx.moveTo(path.centerX, path.centerY);
        } else {
          ctx.lineTo(path.centerX, path.centerY);
        }
      }

      ctx.stroke();
    }

    drawPath();
    setPathCanvas(canvas);
  }, [paths]);

  const ladderHeight = `h-[${LADDER_HEIGHT}px]`;

  return (
    <div className={`w-full ${ladderHeight} relative`} ref={containerRef}>
      {/* 컴포넌트로 빼기 */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-blue-400 transition-opacity duration-500 z-10 ${
          isStarted ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        className={`absolute top-0 left-0  flex flex-row w-full h-full justify-evenly`}
        style={{
          width: `${rect?.width}`,
          height: `${rect?.height}`,
        }}
        ref={canvasRef}
      ></canvas>
      <canvas
        className={`absolute top-0 left-0  flex flex-row w-full h-full justify-evenly`}
        style={{
          width: `${rect?.width}`,
          height: `${rect?.height}`,
        }}
        ref={pathRef}
      ></canvas>
    </div>
  );
};
