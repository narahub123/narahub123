import { FC, useEffect, useLayoutEffect, useRef } from "react";
import { useLadderGameContext } from "../hooks";
import { LadderGameLadderMask, LadderGameLadder } from "../components";

export type LadderGameLadderContainerProps = {};

export const LadderGameLadderContainer: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<HTMLCanvasElement>(null);

  const {
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

  return (
    <div className={`w-full flex-1 relative`} ref={containerRef}>
      {/* 컴포넌트로 빼기 */}
      <LadderGameLadderMask />
      <LadderGameLadder />
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
