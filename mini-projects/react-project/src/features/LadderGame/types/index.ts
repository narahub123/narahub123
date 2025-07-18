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

export type LadderGameContextType = {
  participants: number;
  setParticipants: React.Dispatch<React.SetStateAction<number>>;
  numOfWinners: number;
  setNumOfWinners: React.Dispatch<React.SetStateAction<number>>;
  winners: boolean[];
  setWinners: React.Dispatch<React.SetStateAction<boolean[]>>;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  selectorPositions: number[];
  setSelectorPositions: React.Dispatch<React.SetStateAction<number[]>>;
  bridges: BridgePos[];
  setBridges: React.Dispatch<React.SetStateAction<BridgePos[]>>;
  positions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  paths: Position[];
  setPaths: React.Dispatch<React.SetStateAction<Position[]>>;
  canvas: HTMLCanvasElement | null;
  setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
  pathCanvas: HTMLCanvasElement | null;
  setPathCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
  rect: {
    width: number;
    height: number;
  } | null;
  setRect: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    } | null>
  >;
};
