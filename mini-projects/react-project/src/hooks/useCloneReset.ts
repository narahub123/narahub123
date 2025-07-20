import { useDashboardContext } from "./useDashboardContext";

export const useCloneReset = () => {
  const {
    originalCardRect,
    setCloneStyle,
    setCloneCard,
    setOriginalCardRect,
    cloneCardRef,
    InnerComponent,
    setInnerComponent,
    setIsCentered,
    setCloneSize,
  } = useDashboardContext();

  const resetClone = (onComplete?: () => void) => {
    if (!originalCardRect || !cloneCardRef.current) return;

    const cloneElem = cloneCardRef.current;
    const { top, left, width, height } = originalCardRect;

    // 이벤트 핸들러 - 한 번만 실행되도록 분리
    const clearCloneRecord = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;

      // 이벤트 핸들러 제거
      cloneElem.removeEventListener("transitionend", clearCloneRecord);

      // 상태 초기화
      setCloneCard(null);
      setOriginalCardRect(null);
      setCloneStyle(null);
      setCloneSize(null);
      setIsCentered(false);

      if (onComplete) onComplete();
    };

    if (!InnerComponent) {
      // 컴포넌트가 없는 경우: 간단히 원위치로 돌아감
      setCloneStyle({
        position: "absolute",
        width,
        height,
        top,
        left,
        transition: "transform 0.5s ease",
        transform: `translate(0px, 0px)`,
      });

      // 리셋 동작 시에만 이벤트 리스너 등록
      cloneElem.addEventListener("transitionend", clearCloneRecord);
    } else {
      // 컴포넌트가 있는 경우: 복잡한 트랜지션 로직

      // InnerComponent 제거
      setInnerComponent(null);

      const centerX = window.innerWidth / 2 - width / 2;
      const centerY = window.innerHeight / 2 - height / 2;

      // 중앙 위치로 스타일 변경 (transition width 포함)
      setCloneStyle((prev) => ({
        ...prev,
        top: centerY,
        left: centerX,
        width,
        height,
        transition: "all 0.5s ease",
      }));

      // 이벤트 핸들러 - width 트랜지션 종료 감지
      const onTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "width") return;

        cloneElem.removeEventListener("transitionend", onTransitionEnd);

        // transform 초기화 및 위치 복원 준비
        setCloneStyle((prev) => ({
          ...prev,
          top,
          left,
          transition: "none",
          transform: `translate(${centerX - left}px, ${centerY - top}px)`,
        }));

        // 다음 프레임에 transform 트랜지션 적용
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCloneStyle((prev) => ({
              ...prev,
              top,
              left,
              transition: "transform 0.5s ease",
              transform: `translate(0px, 0px)`,
            }));

            // transform 트랜지션 완료 시 상태 초기화 이벤트 등록
            cloneElem.addEventListener("transitionend", clearCloneRecord);
          });
        });
      };

      // width 트랜지션 종료 감지를 위해 이벤트 리스너 등록
      cloneElem.addEventListener("transitionend", onTransitionEnd);
    }
  };

  return resetClone;
};
