import { generateOrders, generateWinners } from "../utils";
import useLadderGameContext from "./useLadderGameContext";

const useGameStart = () => {
  const {
    setIsStarted,
    participants,
    numOfWinners,
    setWinners,
    gameType,
    setOrders,
  } = useLadderGameContext();

  const handleGameStart = () => {
    setIsStarted((prev) => (prev === false ? true : prev));
    if (gameType === "winner") {
      generateWinners(participants, numOfWinners, setWinners);
    } else {
      generateOrders(participants, setOrders);
    }
  };

  return handleGameStart;
};

export default useGameStart;
