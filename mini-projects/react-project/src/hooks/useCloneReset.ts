import { useDashboardContext } from "./useDashboardContext";

export const useCloneReset = () => {
  const {
    originalCardRect,
    setCloneStyle,
    setCloneCard,
    setOriginalCardRect,
    cloneCardRef,
  } = useDashboardContext();

  const resetClone = () => {
    if (!originalCardRect || !cloneCardRef.current) return;

    const cloneElem = cloneCardRef.current;
    const { top, left, width, height } = originalCardRect;

    // 기존 위치로 돌아감
    setCloneStyle({
      position: "absolute",
      width,
      height,
      top,
      left,
      transition: "transform 0.5s ease",
      transform: `translate(0px, 0px)`,
    });

    const clearCloneRecord = (e: TransitionEvent) => {
      // transitionend 이벤트를 호출하는 property 중 transform에만 반응하기 위한 검사
      if (e.propertyName !== "transform") return;

      setCloneCard(null);
      setOriginalCardRect(null);
      setCloneStyle(null);
    };

    // 이동 완료 후에는 cloneCard를 비워야 함
    cloneElem.addEventListener("transitionend", clearCloneRecord);
  };

  return resetClone;
};
