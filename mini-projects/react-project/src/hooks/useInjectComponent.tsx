import { useEffect } from "react";
import { useDashboardContext } from "./useDashboardContext";

export const useInjectComponent = () => {
  const { isCentered, setInnerComponent, cloneCard } = useDashboardContext();
  useEffect(() => {
    if (!isCentered || !cloneCard) return;

    if (cloneCard.component) setInnerComponent(cloneCard.component);
  }, [isCentered, cloneCard, setInnerComponent]);
};
