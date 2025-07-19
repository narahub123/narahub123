import { FC, useLayoutEffect, useRef } from "react";
import { useLadderGameContext, useMeasureContainerSize } from "../hooks";
import {
  LadderGameLadderMask,
  LadderGameLadder,
  LadderGamePaths,
} from "../components";

export const LadderGameLadderContainer: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useMeasureContainerSize(containerRef);

  return (
    <div className={`w-full flex-1 relative`} ref={containerRef}>
      <LadderGameLadderMask />
      <LadderGameLadder />
      <LadderGamePaths />
    </div>
  );
};
