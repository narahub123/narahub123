import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { cards } from "../data";
import { Card } from "../components";
import { Masonry } from "../layouts";
import { CardData } from "../types";
import { MemoryGame } from "../features";

export const Dashboard = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cloneCardRef = useRef<HTMLDivElement | null>(null);

  const [cloneCard, setCloneCard] = useState<CardData | null>(null);
  const [cloneStyle, setCloneStyle] = useState<CSSProperties | null>(null);
  const [isCentered, setIsCentered] = useState(false);
  const [innerComponent, setInnerComponent] = useState<ReactNode>(null);

  useEffect(() => {
    if (!cloneCard || !cloneCardRef.current) return;

    const cloneCardElem = cloneCardRef.current;

    const handleTransitionEnd = (e: TransitionEvent) => {
      console.log(`transitionend fired: propertyName=${e.propertyName}`);
      console.log(`transitioned target: ${e.target}`);

      if (e.target === cloneCardElem && e.propertyName === "transform") {
        console.log("클론 카드 이동 완료");
        setIsCentered(true); // 클론 카드가 중앙에 위치했는지에 대한 상태 업데이트

        if (cloneCard.skill === "Rotate") {
          setInnerComponent(<MemoryGame />);
        }
      }
    };

    cloneCardElem.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      cloneCardElem.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [cloneCard]);

  // 중앙으로 이동시키는 스타일 설정
  const moveCloneToCenter = (
    top: number,
    left: number,
    width: number,
    height: number,
    containerRect: DOMRect
  ) => {
    const centerX = containerRect.width / 2 - width / 2;
    const centerY = containerRect.height / 2 - height / 2;

    setCloneStyle({
      position: "absolute",
      top,
      left,
      width,
      height,
      transition: "transform 0.5s ease",
      transform: `translate(${centerX - left}px, ${centerY - top}px)`,
      zIndex: 10,
    });
  };

  const resetClonePosition = () => {
    setCloneStyle((prev) => ({
      ...prev!,
      transform: "translate(0px, 0px)",
    }));

    setTimeout(() => {
      setCloneCard(null);
      setCloneStyle(null);
    }, 500);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    card: CardData
  ) => {
    const dom = e.currentTarget;
    const container = containerRef.current;

    if (!dom || !container) return;

    const rect = dom.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const startTop = rect.top - containerRect.top;
    const startLeft = rect.left - containerRect.left;

    const width = rect.width;
    const height = rect.height;

    // 같은 카드 클릭 → 복귀
    if (cloneCard?.name === card.name) {
      resetClonePosition();
      return;
    }

    // 기존 다른 카드가 있을 경우 → 원위치 복귀 후 새로운 카드 중앙으로
    if (cloneCard) {
      resetClonePosition();
      setTimeout(() => {
        setCloneCard(card);
        setCloneStyle({
          position: "absolute",
          top: startTop,
          left: startLeft,
          width,
          height,
          transition: "transform 0.5s ease",
          transform: "translate(0px, 0px)",
          zIndex: 10,
        });

        requestAnimationFrame(() => {
          moveCloneToCenter(startTop, startLeft, width, height, containerRect);
        });
      }, 500);
      return;
    }

    // 최초 클릭 시 → clone 생성 및 중앙 이동
    setCloneCard(card);
    setCloneStyle({
      position: "absolute",
      top: startTop,
      left: startLeft,
      width,
      height,
      transition: "transform 0.5s ease",
      transform: "translate(0px, 0px)",
      zIndex: 10,
    });

    requestAnimationFrame(() => {
      moveCloneToCenter(startTop, startLeft, width, height, containerRect);
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Card나 cloneCard가 아닌 부분만 클릭된 경우 닫기
    if (
      containerRef.current &&
      !target.closest("button") && // 카드가 button인 경우
      cloneCard
    ) {
      resetClonePosition();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen p-4 overflow-hidden"
      onClick={handleContainerClick}
    >
      <Masonry>
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={handleClick} />
        ))}
        {cloneCard && cloneStyle && (
          <div
            id="clone_card"
            style={cloneStyle}
            className="overflow-hidden rounded-md shadow-lg"
            ref={cloneCardRef}
          >
            {isCentered && innerComponent ? (
              innerComponent
            ) : (
              <Card
                card={cloneCard}
                onClick={() => {}}
                style={{ height: cloneStyle.height }}
              />
            )}
          </div>
        )}
      </Masonry>
    </div>
  );
};
