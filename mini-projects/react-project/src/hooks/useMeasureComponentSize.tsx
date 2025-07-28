import { useEffect } from "react";
import { useDashboardContext } from "./useDashboardContext";

export const useMeasureComponentSize = () => {
  const { InnerComponent, componentRef, setCloneSize } = useDashboardContext();

  useEffect(() => {
    if (!componentRef.current || !InnerComponent) return;

    const getSize = () => {
      if (!componentRef.current) return;

      const component = componentRef.current;

      const { width, height } = component.getBoundingClientRect();

      setCloneSize({ width, height });
    };

    requestAnimationFrame(() => getSize());
  }, [InnerComponent, componentRef, setCloneSize]);
};
