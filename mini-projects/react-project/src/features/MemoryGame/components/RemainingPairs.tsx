import { FC } from "react";

type RemainingPairsProps = {
  remainingPairs: number;
};

export const RemainingPairs: FC<RemainingPairsProps> = ({ remainingPairs }) => {
  return (
    <div className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
      <span>남은 카드 쌍의 개수:</span>
      <span className="text-blue-600">{remainingPairs}</span>
    </div>
  );
};
