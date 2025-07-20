import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";
import { CardData } from "./Card";

export * from "./Card";
export * from "./Icon";

export interface IComponentSize {
  width: number | string;
  height: number | string;
}

export interface IDashboard {
  cloneCardRef: React.RefObject<HTMLDivElement | null>;
  componentRef: React.RefObject<HTMLDivElement | null>;
  cloneCard: CardData | null;
  setCloneCard: React.Dispatch<React.SetStateAction<CardData | null>>;
  cloneStyle: CSSProperties | null;
  setCloneStyle: React.Dispatch<React.SetStateAction<CSSProperties | null>>;
  originalCardRect: CSSProperties | null;
  setOriginalCardRect: React.Dispatch<
    React.SetStateAction<CSSProperties | null>
  >;
  InnerComponent:
    | ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>
    | null
    | undefined;
  setInnerComponent: React.Dispatch<
    React.SetStateAction<
      | ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>
      | null
      | undefined
    >
  >;
  cloneSize: {
    width: number;
    height: number;
  } | null;
  setCloneSize: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    } | null>
  >;
}
