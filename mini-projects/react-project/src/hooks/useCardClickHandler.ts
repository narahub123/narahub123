import { CardData } from "../types";
import { useCloneMover, useDashboardContext } from "../hooks";

type useCardClickHandlerProps = {};

export const useCardClickHandler = ({}: useCardClickHandlerProps) => {
  const { setCloneCard, setCloneStyle, setOriginalCardRect } =
    useDashboardContext();

  const moveCloneToCenter = useCloneMover();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    card: CardData
  ) => {
    if (!e.currentTarget) return;
    // e.target과 e.currentTarget의 차이점 구별하기
    const originalCard = e.currentTarget;

    const originalCardRect = originalCard.getBoundingClientRect();

    const startTop = originalCardRect.top;
    const startLeft = originalCardRect.left;

    const width = originalCardRect.width;
    const height = originalCardRect.height;

    // 클론 카드 생성
    setCloneCard(card);
    setCloneStyle({
      position: "absolute",
      top: startTop,
      left: startLeft,
      width,
      height,
      transform: "translate(0px, 0px)",
      transition: "transform 0.5s ease",
    });
    setOriginalCardRect(originalCardRect);

    // 가운데로 이동
    requestAnimationFrame(() => {
      console.log("여기 옮");

      moveCloneToCenter(startTop, startLeft, width, height);
    });
  };

  return handleClick;
};
