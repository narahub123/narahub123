import { useEffect } from "react";
import useLadderGameContext from "./useLadderGameContext";
import { Position } from "../types";

const useGeneratePaths = () => {
  const { selected, selectorPositions, positions, rect, setPaths } =
    useLadderGameContext();

  useEffect(() => {
    if (selected < 0) return;

    const paths: Position[] = [];

    const traceGreedyPaths = () => {
      const startPoint: number = selectorPositions[selected];

      paths.push({ centerX: startPoint, centerY: 0 });

      let next: Position | undefined = {
        centerX: startPoint,
        centerY: 0,
      };

      while (next) {
        next = positions.find(
          (position) =>
            next!.centerY < position.centerY &&
            position.centerX === next!.centerX
        );

        if (!next) {
          paths.push({
            centerX: paths[paths.length - 1].centerX,
            centerY: rect?.height || 300,
          });
          next = undefined;
          break;
        }

        paths.push(next);

        next = positions.find(
          (position) =>
            next?.centerX !== position.centerX &&
            next?.centerY === position.centerY
        )!;

        paths.push(next);
      }
    };

    traceGreedyPaths();

    setPaths(paths);
  }, [selected, selectorPositions, positions, rect]);
};

export default useGeneratePaths;
