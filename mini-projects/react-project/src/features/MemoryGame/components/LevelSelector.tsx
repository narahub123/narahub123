import { FC } from "react";
import { LEVELS } from "../constants";

type LevelSelectorProps = {
  level: number | ""; // select의 타입 설정 시 무선택은 빈문자열임을 주의할 것
  completedLevels: number[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const LevelSelector: FC<LevelSelectorProps> = ({
  level,
  onChange,
  completedLevels,
}) => {
  const isCompleted = (level: number) => completedLevels.includes(level);

  return (
    <select className="" value={level} onChange={onChange}>
      {/* 레벨을 선택해주세요 항목을 선택할 수 없게 만들기 위해 disabled 추가 */}
      <option value="" className="" disabled>
        레벨을 선택해주세요
      </option>
      {LEVELS.map((level) => (
        <option
          className=""
          value={level}
          key={level}
          disabled={isCompleted(level)}
        >
          {`lv ${level}${isCompleted(level) ? " - completed" : ""}`}
        </option>
      ))}
    </select>
  );
};
