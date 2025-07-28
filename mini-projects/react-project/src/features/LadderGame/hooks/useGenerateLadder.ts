import { useEffect } from "react";
import useLadderGameContext from "./useLadderGameContext";
import { BridgePos } from "../types";
import { BRIDGES_MAX } from "../constants";

const useGenerateLadder = () => {
  const { selectorPositions, rect, setBridges } = useLadderGameContext();

  useEffect(() => {
    if (selectorPositions.length === 0 || !rect) return;

    const bridges: BridgePos[] = [];

    for (let i = 0; i < selectorPositions.length - 1; i++) {
      // 랜덤 다리 개수 생성
      const numOfBridges = Math.floor(Math.random() * (BRIDGES_MAX - 1) + 1);

      const froms = bridges.map((b) => b.from.centerY);

      const yPositions: number[] = [...froms];

      // 랜덤 다리를 기반으로 시작점과 종료 점의 생성
      // x 위치는 정해져 있기 때문에 y만 생성하면 됨
      for (let j = 0; j < numOfBridges; j++) {
        // y 위치가 0 ~ 300 이었는데 20 ~ 280으로 변경함
        let yPosition = Math.random() * (rect.height - 40) + 20;

        let attempts = 0;
        const MAX_ATTEMPTS = 100;

        while (yPositions.some((y) => Math.abs(y - yPosition) < 20)) {
          yPosition = Math.random() * (rect.height - 40) + 20;
          attempts++;

          if (attempts > MAX_ATTEMPTS) break;
        }

        yPositions.push(yPosition);

        const from = {
          centerX: selectorPositions[i],
          centerY: yPosition,
        };
        const to = {
          centerX: selectorPositions[i + 1],
          centerY: yPosition,
        };

        bridges.push({ from, to });
      }
    }

    setBridges(bridges);
  }, [selectorPositions, rect, setBridges]);
};

export default useGenerateLadder;
