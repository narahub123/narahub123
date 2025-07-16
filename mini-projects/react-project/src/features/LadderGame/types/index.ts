export type LadderGameButtonType = {
  text: string;
  onClick: () => void;
  color: "primary" | "warning";
};

export type Position = {
  centerX: number;
  centerY: number;
};

export type BridgePos = {
  from: Position;
  to: Position;
};
