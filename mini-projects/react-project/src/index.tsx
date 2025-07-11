import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/material-icons";
import { Masonry } from "./layouts";
import { Card } from "./components";
import { CardData } from "./types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const cards: CardData[] = [
  {
    skill: "Function",
    icon: "calculate",
    name: "Calculator",
    height: 5,
  },
  {
    skill: "Rotate",
    icon: "rotate_right",
    name: "Memory Game",
    height: 4,
  },
  {
    skill: "DFS/BFS",
    icon: "home",
    name: "Ghost Leg",
    height: 8,
  },
  {
    skill: "Drag Event",
    icon: "home",
    name: "Drag and Drop",
    height: 4,
  },
  {
    skill: "Stack",
    icon: "home",
    name: "History",
  },
];

root.render(
  <React.StrictMode>
    <Masonry>
      {cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </Masonry>
  </React.StrictMode>
);
