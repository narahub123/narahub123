import { useEffect } from "react";
import { Position } from "../types";
import useLadderGameContext from "./useLadderGameContext";

const useSortPositions = () => {
  const { bridges, setPositions } = useLadderGameContext();

  useEffect(() => {
    let positions: Position[] = [];
    for (let i = 0; i < bridges.length; i++) {
      const posis = Object.values(bridges[i]);

      positions.push(...posis);
    }

    positions = positions
      .sort((a: Position, b: Position) => a.centerY - b.centerY)
      .sort((a: Position, b: Position) => a.centerX - b.centerX);

    setPositions(positions);
  }, [bridges, setPositions]);
};

export default useSortPositions;
