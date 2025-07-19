import { FC, useLayoutEffect, useRef } from "react";
import { useLadderGameContext } from "../hooks";
import {
  LadderGameLadderMask,
  LadderGameLadder,
  LadderGamePaths,
} from "../components";

export const LadderGameLadderContainer: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { setRect } = useLadderGameContext();

  // 컴포넌트 크기 측정
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const getContainerRect = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();

      setRect({ width, height });
    };

    getContainerRect();

    window.addEventListener("resize", getContainerRect);

    return () => window.removeEventListener("resize", getContainerRect);
  }, []);

  return (
    <div className={`w-full flex-1 relative`} ref={containerRef}>
      <LadderGameLadderMask />
      <LadderGameLadder />
      <LadderGamePaths />
    </div>
  );
};
