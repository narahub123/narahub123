import { useEffect, useRef } from "react";
import { useLadderGameContext } from "../hooks";

export const LadderGameLadder = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { rect, selectorPositions, bridges, setCanvas } =
    useLadderGameContext();

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
        const centerX = selectorPositions[i];
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#777";
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
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
  }, [selectorPositions, bridges, setCanvas]);

  if (!rect) return null;

  return (
    <canvas
      className={`absolute top-0 left-0  w-full h-full `}
      ref={canvasRef}
    ></canvas>
  );
};
