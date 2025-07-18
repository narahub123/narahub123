import { useLadderGameContext } from "../hooks";

export const LadderGameLadderMask = () => {
  const { isStarted } = useLadderGameContext();

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-blue-400 transition-opacity duration-500 z-10 ${
        isStarted ? "opacity-0" : "opacity-100"
      }`}
    />
  );
};
