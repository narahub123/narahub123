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

  if (!rect) return null;

  return (
    <canvas
      className={`absolute top-0 left-0  flex flex-row w-full h-full justify-evenly`}
      style={{
        width: `${rect?.width}`,
        height: `${rect?.height}`,
      }}
      ref={pathRef}
    ></canvas>
  );
};

export default LadderGamePaths;
