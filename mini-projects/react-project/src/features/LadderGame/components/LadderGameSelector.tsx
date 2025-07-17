import { forwardRef } from "react";

export type LadderGameSelectorProps = {
  index: number;
  isStarted: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export const LadderGameSelector = forwardRef<
  HTMLButtonElement,
  LadderGameSelectorProps
>(({ index, isStarted, setSelected }, ref) => {
  const handleSelect = () => setSelected(index);

  return (
    <div
      className="relative w-10 aspect-square"
      key={`participant-${index}`}
      onClick={handleSelect}
    >
      <button
        className={`absolute top-0 left-0 w-10 border-2 rounded-full aspect-square ${
          isStarted ? "hover:scale-110" : ""
        }`}
        disabled={!isStarted} // 시작전에는 클릭 금지
        ref={ref}
      >
        {index + 1}
      </button>
    </div>
  );
});
