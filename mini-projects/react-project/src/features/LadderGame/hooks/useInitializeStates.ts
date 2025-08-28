import useLadderGameContext from "./useLadderGameContext";

const useInitializeStates = () => {
  const {
    setParticipants,
    setNumOfWinners,
    setWinners,
    setIsStarted,
    setBridges,
    setPaths,
    setSelected,
    setPositions,
    setSelectorPositions,
    canvas,
    rect,
    pathCanvas,
    setOrders,
  } = useLadderGameContext();

  // 초기화 => 캔버스 초기화 구현 방법
  const initializeStates = () => {
    setParticipants(1);
    setNumOfWinners(1);
    setWinners([]);
    setIsStarted((prev) => (prev === true ? false : prev));
    setBridges([]);
    setPaths([]);
    setSelected(-1);
    setPositions([]);
    setSelectorPositions([]);
    setOrders([]);
    if (canvas && rect) {
      const ctx = canvas.getContext("2d");

      ctx?.clearRect(0, 0, rect.width, rect.height);
    }
    if (pathCanvas && rect) {
      const ctx = pathCanvas.getContext("2d");

      ctx?.clearRect(0, 0, rect.width, rect.height);
    }
  };

  return initializeStates;
};

export default useInitializeStates;
