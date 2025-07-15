import { FC } from "react";

export type LadderGameLadderContainerProps = {
  isStarted: boolean;
  participants: number;
};

export const LadderGameLadderContainer: FC<LadderGameLadderContainerProps> = ({
  isStarted,
  participants,
}) => {
  return (
    <div className="w-full h-[300px] relative border-2">
      <div
        className={`absolute top-0 left-0 w-full h-full bg-blue-400 transition-opacity duration-500 ${
          isStarted ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas className="flex flex-row w-full h-full justify-evenly"></canvas>
    </div>
  );
};
