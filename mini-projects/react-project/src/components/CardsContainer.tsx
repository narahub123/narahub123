import { FC, useRef } from "react";
import { Card } from "../components";
import { Masonry } from "../layouts";
import { cards } from "../data";
import { useCardClickHandler, useContainerClickHandler } from "../hooks";

export const CardsContainer: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // card를 클릭한 경우
  const handleClick = useCardClickHandler({});

  // 컨테이너 클릭 시 카드가 아닌 부분을 클릭한 경우 초기화
  const handleContainerClick = useContainerClickHandler(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-4 overflow-auto"
      onClick={handleContainerClick}
    >
      <Masonry>
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={(e) => handleClick(e, card)} />
        ))}
      </Masonry>
    </div>
  );
};
