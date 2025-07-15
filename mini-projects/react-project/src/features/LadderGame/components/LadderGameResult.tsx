import { FC } from "react";

export type LadderGameResultProps = {
  index: number;
  isStarted: boolean;
};

export const LadderGameResult: FC<LadderGameResultProps> = ({
  index,
  isStarted,
}) => {
  return (
    <div className="relative w-10 aspect-square" key={`result-${index}`}>
      {/* 게임이 시작되면 당첨과 꽝으로 변경되어야 함 */}
      {/* transition 적용 가능? 두 컴포넌트 사이의 overlay */}
      {isStarted ? (
        <div className="absolute top-0 left-0 flex items-center justify-center w-10 border-2 rounded-full aspect-square"></div>
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-10 border-2 rounded-full aspect-square">
          {index + 1}
        </div>
      )}
    </div>
  );
};
