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
    <div className="w-full h-[300px] relative">
      <div
        className={`absolute top-0 left-0 w-full h-full bg-blue-400 transition-opacity duration-500 ${
          isStarted ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="flex flex-row w-full h-full justify-evenly">
        {Array.from({ length: participants }).map((_, index) => (
          <div
            className="flex items-center justify-center w-10 h-full border-2"
            key={`ladder-${index}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
