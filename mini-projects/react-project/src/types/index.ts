import { CSSProperties } from "react";
import { CardData } from "./Card";

export * from "./Card";
export * from "./Icon";

export interface IComponentSize {
  width: number | string;
  height: number | string;
}

export interface IDashboard {
  containerRef: React.RefObject<HTMLDivElement | null>;
  setCloneCard: React.Dispatch<React.SetStateAction<CardData | null>>;
  setCloneStyle: React.Dispatch<React.SetStateAction<CSSProperties | null>>;
  originalCardRect: CSSProperties | null;
  setOriginalCardRect: React.Dispatch<
    React.SetStateAction<CSSProperties | null>
  >;
}
