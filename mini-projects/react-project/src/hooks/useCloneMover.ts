import { useDashboardContext } from "./useDashboardContext";

export const useCloneMover = () => {
  const { containerRef, setCloneStyle } = useDashboardContext();

  const moveCloneToCenter = (
    top: number,
    left: number,
    width: number,
    height: number
  ) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const centerX = containerRect.width / 2 - width / 2;
    const centerY = containerRect.height / 2 - height / 2;

    setCloneStyle({
      position: "absolute",
      width,
      height,
      left,
      top,
      transition: "transform 0.5s ease",
      transform: `translate(${centerX - left}px, ${centerY - top}px)`,
    });
  };

  return moveCloneToCenter;
};
