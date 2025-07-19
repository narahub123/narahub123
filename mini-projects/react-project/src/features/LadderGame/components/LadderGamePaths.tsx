import { useEffect, useRef } from "react";
import { useLadderGameContext } from "../hooks";

export const LadderGamePaths = () => {
  const pathRef = useRef<HTMLCanvasElement>(null);

  const { rect, paths, setPathCanvas } = useLadderGameContext();

  // 경로 그리기
  useEffect(() => {
    if (paths.length === 0 || !pathRef.current) return;

    const canvas = pathRef.current;
    const ctx = pathRef.current?.getContext("2d")!;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";

    let curIndex = 0;
    let progress = 0;
    let speed = 5; // 숫자가 클수록 빠름

    function drawPath() {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();

      // 차례대로 그리기 위해서는 paths의 길이가 아닌 curIndex 사용
      for (let i = 0; i < curIndex; i++) {
        const path = paths[i];

        if (i === 0) {
          ctx.moveTo(path.centerX, path.centerY);
        } else {
          ctx.lineTo(path.centerX, path.centerY);
        }
      }

      // curIndex가 paths.length보다 작은 경우
      if (curIndex < paths.length) {
        const start = paths[curIndex - 1] || paths[0];
        const end = paths[curIndex];

        if (end) {
          const x = start.centerX + (end.centerX - start.centerX) * progress;
          const y = start.centerY + (end.centerY - start.centerY) * progress;

          if (curIndex === 0) ctx.moveTo(start.centerX, start.centerY);
          ctx.lineTo(x, y);

          progress += 0.02 * speed;

          if (progress >= 1) {
            progress = 0;
            curIndex++;
          }
        }
      }

      ctx.stroke();

      if (curIndex < paths.length) {
        requestAnimationFrame(drawPath);
      }
    }

    drawPath();
    setPathCanvas(canvas);
  }, [paths]);

  if (!rect) return null;

  return (
    <canvas
      className={`absolute top-0 left-0 w-full h-full`}
      ref={pathRef}
    ></canvas>
  );
};

export default LadderGamePaths;
