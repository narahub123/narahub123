import { ForwardRefExoticComponent, RefAttributes } from "react";
import { MaterialIconName } from "./Icon";

export type CardData = {
  skill: string;
  icon: MaterialIconName;
  name: string;
  height?: number;
  component?: ForwardRefExoticComponent<RefAttributes<HTMLDivElement>> | null;
};
