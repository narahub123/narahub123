import { CardData } from "../types";
import { useCloneMover, useCloneReset, useDashboardContext } from "../hooks";

type useCardClickHandlerProps = {};

export const useCardClickHandler = ({}: useCardClickHandlerProps) => {
  const { setCloneCard, setCloneStyle, setOriginalCardRect, cloneCard } =
    useDashboardContext();

  const moveCloneToCenter = useCloneMover();
  const resetClone = useCloneReset();

  const createAndMoveClone = (card: CardData, originalCardRect: DOMRect) => {
    const { top, left, width, height } = originalCardRect;

    setCloneCard(card);
    setCloneStyle({
      position: "absolute",
      top,
      left,
      width,
      height,
      transform: "translate(0px, 0px)",
      transition: "transform 0.5s ease",
    });
    setOriginalCardRect(originalCardRect);

    requestAnimationFrame(() => {
      moveCloneToCenter(top, left, width, height);
    });
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    card: CardData
  ) => {
    e.stopPropagation();
    if (!e.currentTarget) return;
    // e.target과 e.currentTarget의 차이점 구별하기
    const originalCard = e.currentTarget;

    const originalCardRect = originalCard.getBoundingClientRect();

    if (cloneCard) {
      // 클론 카드의 원본 카드를 클릭한 경우
      if (cloneCard.name === card.name) {
        resetClone(); // 원 위치로 돌아감
        return;
      } else if (cloneCard.name !== card.name) {
        // 클론 카드의 원본과 다른 카드를 클릭한 경우
        // 클론 카드를 원래 위치에 돌려놓고 새로운 카드의 클론 카드를 생성하고 중앙으로 이동해야 함
        resetClone(() => {
          createAndMoveClone(card, originalCardRect);
        });

        return;
      }
    }

    createAndMoveClone(card, originalCardRect);
  };

  return handleClick;
};
