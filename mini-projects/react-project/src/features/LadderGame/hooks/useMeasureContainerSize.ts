import { useLayoutEffect } from "react";
import useLadderGameContext from "./useLadderGameContext";

const useMeasureContainerSize = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
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
  }, [containerRef.current]);
};

export default useMeasureContainerSize;
