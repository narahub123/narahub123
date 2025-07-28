import { useEffect } from "react";
import { useDashboardContext } from "./useDashboardContext";

export const useUpdatePosition = () => {
  const { setCloneStyle, cloneSize } = useDashboardContext();

  useEffect(() => {
    if (!cloneSize) return;

    const sizeUp = () => {
      setCloneStyle({
        position: "absolute",
        top: window.innerHeight / 2 - cloneSize.height / 2,
        left: window.innerWidth / 2 - cloneSize.width / 2,
        width: cloneSize.width,
        height: cloneSize.height,
        transition: "all 0.5s ease",
      });
    };

    requestAnimationFrame(() => sizeUp());
  }, [cloneSize, setCloneStyle]);
};
