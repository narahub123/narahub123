import { FC } from "react";

type StartButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export const StartButton: FC<StartButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed`}
      disabled={disabled}
      onClick={onClick}
    >
      게임 시작
    </button>
  );
};
