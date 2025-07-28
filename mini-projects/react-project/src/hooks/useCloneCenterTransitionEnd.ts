import { useEffect } from "react";
import { useDashboardContext } from "./useDashboardContext";

export const useCloneCenterTransitionEnd = () => {
  const { cloneCardRef, cloneCard, setIsCentered } = useDashboardContext();

  useEffect(() => {
    if (!cloneCardRef.current || !cloneCard) return;

    const cloneCardElem = cloneCardRef.current;

    const handleCloneCenterTransitionend = (e: TransitionEvent) => {
      if (
        e.target === cloneCardElem &&
        e.propertyName === "transform" &&
        cloneCard.component
      ) {
        setIsCentered(true);
      }
    };

    cloneCardElem.addEventListener(
      "transitionend",
      handleCloneCenterTransitionend
    );

    return () =>
      cloneCardElem.removeEventListener(
        "transitionend",
        handleCloneCenterTransitionend
      );
  }, [cloneCard, cloneCardRef, setIsCentered]);
};
