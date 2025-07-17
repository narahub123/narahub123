import { FC, useEffect, useState } from "react";
import {
  LadderGameLadderContainer,
  LadderGameResultsContainer,
  LadderGameSelectorsContainer,
} from "../components";
import { BridgePos, Position } from "../types";
import { BRIDGES_MAX, LADDER_HEIGHT } from "../constants";

export type LadderGameGroundProps = {
  isStarted: boolean;
  participants: number;
};

export const LadderGameGround: FC<LadderGameGroundProps> = ({
  isStarted,
  participants,
}) => {
  const [selectorPositions, setSelectorPositions] = useState<Position[]>([]);

  const [bridges, setBridges] = useState<BridgePos[]>([]);

  const [positions, setPositions] = useState<Position[]>([]);

  const [selected, setSelected] = useState(-1);

  const [paths, setPaths] = useState<Position[]>([]);

  useEffect(() => {
    if (selectorPositions.length === 0) return;

    const bridges: BridgePos[] = [];

    for (let i = 0; i < selectorPositions.length - 1; i++) {
      // 랜덤 다리 개수 생성
      const numOfBridges = Math.floor(Math.random() * (BRIDGES_MAX - 1) + 1);

      const yPositions: number[] = [];

      // 랜덤 다리를 기반으로 시작점과 종료 점의 생성
      // x 위치는 정해져 있기 때문에 y만 생성하면 됨
      for (let j = 0; j < numOfBridges; j++) {
        let yPosition = Math.random() * LADDER_HEIGHT;

        while (yPositions.some((y) => Math.abs(y - yPosition) < 20)) {
          yPosition = Math.random() * LADDER_HEIGHT;
        }

        yPositions.push(yPosition);

        const from = {
          centerX: selectorPositions[i].centerX,
          centerY: yPosition,
        };
        const to = {
          centerX: selectorPositions[i + 1].centerX,
          centerY: yPosition,
        };

        bridges.push({ from, to });
      }
    }

    setBridges(bridges);
  }, [selectorPositions]);

  // 데이터 정리
  useEffect(() => {
    let positions: Position[] = [];
    for (let i = 0; i < bridges.length; i++) {
      const posis = Object.values(bridges[i]);

      positions.push(...posis);
    }

    positions = positions
      .sort((a: Position, b: Position) => a.centerY - b.centerY)
      .sort((a: Position, b: Position) => a.centerX - b.centerX);

    setPositions(positions);
  }, [bridges]);

  // 길찾기
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
            centerY: 300,
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
  }, [selected]);

  return (
    <div className="flex flex-col w-full gap-4 mt-4">
      <LadderGameSelectorsContainer
        isStarted={isStarted}
        participants={participants}
        selectorPositions={selectorPositions}
        setSelectorPositions={setSelectorPositions}
        setSelected={setSelected}
      />
      <LadderGameLadderContainer
        isStarted={isStarted}
        participants={participants}
        selectorPositions={selectorPositions}
        bridges={bridges}
        paths={paths}
      />
      <LadderGameResultsContainer
        isStarted={isStarted}
        participants={participants}
      />
    </div>
  );
};
