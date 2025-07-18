import { useContext } from "react";
import { LadderGameContext } from "../context/indext";

const useLadderGameContext = () => {
  const context = useContext(LadderGameContext);

  if (!context) throw new Error("LadderGameProvide안에서만 사용해주세요.");

  return context;
};

export default useLadderGameContext;
