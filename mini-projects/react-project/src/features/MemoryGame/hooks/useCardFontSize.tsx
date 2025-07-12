import { useState, useEffect } from "react";

export const useCardFontSize = (cardsPerRow: number) => {
  const [fontSize, setFontSize] = useState("clamp(1rem, 4vw, 3rem)");

  useEffect(() => {
    const updateFontSize = () => {
      const vw = window.innerWidth;

      // 카드 너비 계산 (여기선 padding 제외 안하고 단순 계산)
      const cardWidth = vw / cardsPerRow;

      // 카드 너비 기준 최소/최대 폰트 크기 설정 (임의 값)
      const minFont = Math.max(16, cardWidth * 0.3); // 최소 16px 또는 카드너비 30%
      const maxFont = Math.min(80, cardWidth * 0.8); // 최대 80px 또는 카드너비 80%

      // clamp CSS 문법 생성
      const clampValue = `clamp(${minFont}px, ${
        cardWidth * 0.5
      }px, ${maxFont}px)`;

      setFontSize(clampValue);
    };

    updateFontSize();

    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, [cardsPerRow]);

  return fontSize;
};
