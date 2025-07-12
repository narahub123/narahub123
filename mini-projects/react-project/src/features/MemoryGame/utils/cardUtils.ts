import { cardIcons } from "../data";
import { IFlipCard } from "../types";

export const getRandomIcons = (numOfPairs: number): string[] => {
  if (cardIcons.length < numOfPairs) {
    throw new Error(
      "cardIcons 배열에 쌍을 만들 수 있는 충분한 아이콘이 없습니다."
    );
  }

  const icons: string[] = [];

  while (icons.length < numOfPairs) {
    const icon = cardIcons[Math.floor(Math.random() * cardIcons.length)];

    if (icons.includes(icon)) continue;

    icons.push(icon);
  }

  return icons;
};

export const shuffleIcons = (icons: string[]): string[] => {
  const shuffled: string[] = [...icons];

  // Fisher-Yates 섞기 알고리즘
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const generateCards = (icons: string[]): IFlipCard[] => {
  return icons.map((icon, idx) => ({
    index: idx,
    icon,
    isFlipped: false,
  }));
};

export const createCards = (numOfPairs: number): IFlipCard[] => {
  const randomIcons: string[] = getRandomIcons(numOfPairs);

  const duplicate: string[] = [...randomIcons, ...randomIcons];

  const shuffledIcons: string[] = shuffleIcons(duplicate);

  const cards: IFlipCard[] = generateCards(shuffledIcons);

  return cards;
};
