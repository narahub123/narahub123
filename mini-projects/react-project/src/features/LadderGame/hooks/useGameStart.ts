import { generateWinners } from "../utils";
import useLadderGameContext from "./useLadderGameContext";

const useGameStart = () => {
  const { setIsStarted, participants, numOfWinners, setWinners } =
    useLadderGameContext();

  const handleGameStart = () => {
    setIsStarted((prev) => (prev === false ? true : prev));
    generateWinners(participants, numOfWinners, setWinners);
  };

  return handleGameStart;
};

export default useGameStart;
