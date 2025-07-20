import { useCloneReset } from "./useCloneReset";
import { useDashboardContext } from "./useDashboardContext";

export const useContainerClickHandler = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const resetClone = useCloneReset();

  const { cloneCard, cloneCardRef, originalCardRect } = useDashboardContext();

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !cloneCard ||
      !containerRef.current ||
      !cloneCardRef.current ||
      !originalCardRect
    )
      return;

    const target = e.target as Node;

    // 클릭한 위치가 클론 카드인지 확인
    const isInsideCloneCard = cloneCardRef.current.contains(target);
    // 클릭 한 위치가 컨테이너 안인지 확인
    const isInsideContainer = containerRef.current.contains(target);

    if (!isInsideCloneCard && isInsideContainer) {
      resetClone();
    }
  };

  return handleContainerClick;
};
