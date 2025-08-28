import { FC } from "react";

export type LadderGameInputProps = {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  min?: number;
  max?: number;
};

export const LadderGameInput: FC<LadderGameInputProps> = ({
  label,
  value,
  onChange,
  disabled,
  min = 1,
  max = 10,
}) => {
  return (
    <div className="flex items-center gap-4">
      <p>{label}</p>
      <input
        type="number"
        min={min}
        max={max}
        className="p-2 border-2"
        value={value}
        placeholder={label}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
