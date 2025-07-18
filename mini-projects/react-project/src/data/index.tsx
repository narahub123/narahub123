import { DragAndDrop, LadderGame, MemoryGame } from "../features";
import { CardData } from "../types";

export const cards: CardData[] = [
  {
    skill: "Function",
    icon: "calculate",
    name: "Calculator",
    height: 7,
  },
  {
    skill: "Rotate",
    icon: "rotate_right",
    name: "Memory Game",
    height: 6,
    component: MemoryGame,
  },
  {
    skill: "DFS/BFS",
    icon: "home",
    name: "Ladder Game",
    height: 8,
    component: LadderGame,
  },
  {
    skill: "Drag Event",
    icon: "home",
    name: "Drag and Drop",
    height: 9,
    component: DragAndDrop,
  },
  {
    skill: "Stack",
    icon: "home",
    name: "History",
  },
];
