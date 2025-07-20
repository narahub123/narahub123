import {
  CSSProperties,
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card, CloneCard } from "../components";
import { CardData } from "../types";
import { DashboardProvider } from "../contexts";
import { CardsContainer } from "../components";
import { useCloneReset } from "../hooks";

export const Dashboard = () => {
  const cloneCardRef = useRef<HTMLDivElement | null>(null);

  // 기존 위치로 되돌아가기 위한 상태
  const [originalCardRect, setOriginalCardRect] =
    useState<CSSProperties | null>(null);

  // 클론 카드와 관련된 상태들
  const [cloneCard, setCloneCard] = useState<CardData | null>(null);
  const [cloneStyle, setCloneStyle] = useState<CSSProperties | null>(null);
  const [isCentered, setIsCentered] = useState(false);
  const [InnerComponent, setInnerComponent] = useState<
    ForwardRefExoticComponent<RefAttributes<HTMLDivElement>> | null | undefined
  >(null);

  const [cloneSize, setCloneSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const value = {
    cloneCardRef,
    originalCardRect,
    setOriginalCardRect,
    cloneCard,
    setCloneCard,
    cloneStyle,
    setCloneStyle,
    InnerComponent,
  };

  console.log(cloneStyle);

  // // 사이즈 적용하기
  // useEffect(() => {
  //   if (!cloneSize || !cloneCardRef.current || !cloneStyle) return;

  //   const { width: newWidth, height: newHeight } = cloneSize;

  //   const newTop = (window.innerHeight - newHeight) / 2;
  //   const newLeft = (window.innerWidth - newWidth) / 2;

  //   setCloneStyle((prev) => ({
  //     ...prev!,
  //     width: newWidth,
  //     height: newHeight,
  //     top: newTop,
  //     left: newLeft,
  //     transition: "all 0.3s ease",
  //     transform: "translate(0px, 0px)", // 중앙 이동 후 크기 변경이므로 transform 초기화
  //   }));
  // }, [cloneSize]);

  // // 컴포넌트 크기 가져오기
  // useEffect(() => {
  //   if (!InnerComponent || !componentRef.current) return;

  //   const updateSize = () => {
  //     const component = componentRef.current;
  //     if (!component) return;

  //     const componentRect = component.getBoundingClientRect();
  //     const { width, height } = componentRect;

  //     setCloneSize({ width, height });
  //   };

  //   // 렌더 완료 후에 측정 : 이걸 적용안하면 32, 32 값이 나옴 이유는?
  //   requestAnimationFrame(() => {
  //     updateSize();
  //   });

  //   // 윈도우 리사이즈 감지
  //   window.addEventListener("resize", updateSize);

  //   return () => {
  //     window.removeEventListener("resize", updateSize);
  //   };
  // }, [InnerComponent]);

  // // 컴포넌트 삽입
  // useEffect(() => {
  //   if (!isCentered || !cloneCard) return;

  //   setInnerComponent(cloneCard.component);
  // }, [isCentered, cloneCard]);

  // // 이동 완료 여부 확인
  // useEffect(() => {
  //   if (!cloneCard || !cloneCardRef.current) return;

  //   const cloneCardElem = cloneCardRef.current;

  //   const handleTransitionEnd = (e: TransitionEvent) => {
  //     if (e.target === cloneCardElem && e.propertyName === "transform") {
  //       setIsCentered(true); // 클론 카드가 중앙에 위치했는지에 대한 상태 업데이트
  //     }
  //   };

  //   cloneCardElem.addEventListener("transitionend", handleTransitionEnd);

  //   return () => {
  //     cloneCardElem.removeEventListener("transitionend", handleTransitionEnd);
  //   };
  // }, [cloneCard]);

  // // 중앙으로 이동시키는 스타일 설정
  // const moveCloneToCenter = (
  //   top: number,
  //   left: number,
  //   width: number,
  //   height: number,
  //   containerRect: DOMRect
  // ) => {
  //   const centerX = containerRect.width / 2 - width / 2;
  //   const centerY = containerRect.height / 2 - height / 2;

  //   setCloneStyle({
  //     position: "absolute",
  //     top,
  //     left,
  //     width,
  //     height,
  //     transition: "transform 0.5s ease",
  //     transform: `translate(${centerX - left}px, ${centerY - top}px)`,
  //     zIndex: 10,
  //   });
  // };

  // const resetClonePosition = (onComplete?: () => void) => {
  //   if (!InnerComponent) {
  //     setCloneStyle((prev) => ({
  //       ...prev!,
  //       transform: "translate(0px, 0px)",
  //     }));

  //     setTimeout(() => {
  //       setCloneCard(null);
  //       setCloneStyle(null);
  //       setIsCentered(false);
  //       setInnerComponent(null);
  //       if (onComplete) onComplete();
  //     }, 500);
  //   } else {
  //     if (!cloneCardRef.current || !originalCardRect || !containerRef.current)
  //       return;

  //     const cloneElem = cloneCardRef.current;

  //     const containerRect = containerRef.current.getBoundingClientRect();

  //     if (!originalCardRect?.width || !originalCardRect?.height) return;

  //     const { width, height } = originalCardRect;

  //     const centerX = containerRect.width / 2 - Number(width) / 2;
  //     const centerY = containerRect.height / 2 - Number(height) / 2;

  //     // 첫 번째 애니메이션 실행 (크기 복귀)
  //     setCloneStyle((prev) => ({
  //       ...prev!,
  //       top: centerY,
  //       left: centerX,
  //       width: originalCardRect.width,
  //       height: originalCardRect.height,
  //       transition: "all 0.5s ease",
  //       transform: "translate(0, 0)",
  //     }));

  //     setInnerComponent(null);
  //     // 1단계 끝나면 실행되는 콜백
  //     const onFirstTransitionEnd = (e: TransitionEvent) => {
  //       if (e.propertyName !== "width") return;
  //       const containerRect = containerRef.current?.getBoundingClientRect();
  //       if (!originalCardRect || !containerRect) return;

  //       const top = originalCardRect?.top ?? 0 - containerRect.top;
  //       const left = originalCardRect?.left ?? 0 - containerRect.left;

  //       // 2단계: 위치 복귀
  //       setCloneStyle((prev) => ({
  //         ...prev!,
  //         top,
  //         left,
  //         transform: "translate(0, 0)",
  //         transition: "all 0.5s ease",
  //       }));

  //       // 2단계 종료 후 cleanup
  //       cloneCardRef.current?.addEventListener(
  //         "transitionend",
  //         () => {
  //           setTimeout(() => {
  //             setCloneCard(null);
  //             setCloneStyle(null);
  //             setIsCentered(false);
  //             setOriginalCardRect(null);
  //             componentRef.current = null;
  //             if (onComplete) onComplete();
  //           }, 300);
  //         },
  //         { once: true }
  //       );

  //       // 1단계 이벤트 제거
  //       cloneCardRef.current?.removeEventListener(
  //         "transitionend",
  //         onFirstTransitionEnd
  //       );
  //     };

  //     cloneElem.addEventListener("transitionend", onFirstTransitionEnd);
  //   }
  // };

  // const handleClick = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   card: CardData
  // ) => {
  //   e.stopPropagation();
  //   const dom = e.currentTarget;
  //   const container = containerRef.current;

  //   if (!dom || !container) return;

  //   const rect = dom.getBoundingClientRect();
  //   const containerRect = container.getBoundingClientRect();

  //   const startTop = rect.top - containerRect.top;
  //   const startLeft = rect.left - containerRect.left;

  //   const width = rect.width;
  //   const height = rect.height;

  //   // 같은 카드 클릭 → 복귀
  //   if (cloneCard?.name === card.name) {
  //     resetClonePosition();
  //     return;
  //   }

  //   // 기존 다른 카드가 있을 경우 → 원위치 복귀 후 새로운 카드 중앙으로
  //   if (cloneCard) {
  //     resetClonePosition(() => {
  //       setCloneCard(card);
  //       setCloneStyle({
  //         position: "absolute",
  //         top: startTop,
  //         left: startLeft,
  //         width,
  //         height,
  //         transition: "transform 0.5s ease",
  //         transform: "translate(0px, 0px)",
  //         zIndex: 10,
  //       });
  //       setOriginalCardRect(rect);

  //       requestAnimationFrame(() => {
  //         moveCloneToCenter(startTop, startLeft, width, height, containerRect);
  //       });
  //     });

  //     return;
  //   }

  //   // 최초 클릭 시 → clone 생성 및 중앙 이동
  //   setCloneCard(card);
  //   setCloneStyle({
  //     position: "absolute",
  //     top: startTop,
  //     left: startLeft,
  //     width,
  //     height,
  //     transition: "transform 0.5s ease",
  //     transform: "translate(0px, 0px)",
  //     zIndex: 10,
  //   });
  //   setOriginalCardRect(rect);

  //   requestAnimationFrame(() => {
  //     moveCloneToCenter(startTop, startLeft, width, height, containerRect);
  //   });
  // };

  // const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!cloneCard) return;

  //   // 현재 클릭한 대상이 카드나 클론 카드 내부가 아니라면
  //   const isInsideClone = cloneCardRef.current?.contains(e.target as Node);
  //   const isInsideCardList = containerRef.current?.contains(e.target as Node);

  //   if (!isInsideClone && isInsideCardList) {
  //     resetClonePosition();
  //   }
  // };

  return (
    <DashboardProvider value={value}>
      <main>
        <CardsContainer />
        <CloneCard />
      </main>
    </DashboardProvider>
  );
};
