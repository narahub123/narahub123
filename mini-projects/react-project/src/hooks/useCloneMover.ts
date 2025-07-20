import { useDashboardContext } from "./useDashboardContext";

export const useCloneMover = () => {
  const { setCloneStyle } = useDashboardContext();

  const moveCloneToCenter = (
    top: number,
    left: number,
    width: number,
    height: number
  ) => {
    const centerX = window.innerWidth / 2 - width / 2;
    const centerY = window.innerHeight / 2 - height / 2;

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
