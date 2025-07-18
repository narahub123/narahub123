import { useEffect } from "react";
import useLadderGameContext from "./useLadderGameContext";
import { Position } from "../types";

const useGeneratePaths = () => {
  const { selected, selectorPositions, positions, rect, setPaths } =
    useLadderGameContext();

  useEffect(() => {
    if (selected < 0) return;

    const paths: Position[] = [];

    const getPaths = () => {
      const startPoint: Position = selectorPositions[selected];

      paths.push({ centerX: startPoint.centerX, centerY: 0 });

      let next: Position | undefined = {
        centerX: startPoint.centerX,
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

    getPaths();

    setPaths(paths);
  }, [selected, selectorPositions, positions, rect]);
};

export default useGeneratePaths;
