import { useLayoutEffect } from "react";

export const useStyleBox = (
  boxRef: React.RefObject<HTMLDivElement | null>,
  color: string
) => {
  useLayoutEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.background = color;
      boxRef.current.style.width = "300px";
    }
  }, [color]);
};
