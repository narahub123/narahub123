import { FC } from "react";
import {
  LadderGameLadderContainer,
  LadderGameResultsContainer,
  LadderGameSelectorsContainer,
} from "../components";
import {
  useSortPositions,
  useGenerateLadder,
  useGeneratePaths,
} from "../hooks";

export type LadderGameGroundProps = {};

export const LadderGameGround: FC = () => {
  // 다리 생성 하기
  useGenerateLadder();

  // 데이터 정리
  useSortPositions();

  // 길찾기
  useGeneratePaths();

  return (
    <div className="flex flex-col flex-1 w-full gap-4 mt-4">
      <LadderGameSelectorsContainer />
      <LadderGameLadderContainer />
      <LadderGameResultsContainer />
    </div>
  );
};
