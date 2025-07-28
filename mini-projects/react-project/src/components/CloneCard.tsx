import {
  useDashboardContext,
  useInjectComponent,
  useMeasureComponentSize,
  useUpdatePosition,
} from "../hooks";
import { Card } from "./Card";
import { useCloneCenterTransitionEnd } from "../hooks";

export const CloneCard = () => {
  const { cloneCard, cloneStyle, cloneCardRef, InnerComponent, componentRef } =
    useDashboardContext();

  // 클론 카드의 중앙 이동이 완료 여부 상태 변환
  useCloneCenterTransitionEnd();

  // InnerComponent 추가
  useInjectComponent();

  // InnerComponent가 삽입되면 해당 컴포넌트의 사이즈 측정
  useMeasureComponentSize();

  // InnerComponent의 사이즈를 클론 카드에 적용
  useUpdatePosition();

  if (!cloneCard || !cloneStyle) return null;

  return (
    <div
      id="clone_card"
      style={cloneStyle}
      className="shadow-lg overflow-hiddenrounded-md"
      ref={cloneCardRef}
    >
      {InnerComponent ? (
        <InnerComponent ref={componentRef} />
      ) : (
        <Card
          card={cloneCard}
          onClick={() => {}}
          style={{ height: cloneStyle.height }}
        />
      )}
    </div>
  );
};
