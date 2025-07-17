import { useRef } from "react";

const MyComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="p-4 space-x-4 border-2 border-gray-400 rounded-md shadow-md">
      <input
        type="text"
        className="p-1 border border-blue-400 rounded"
        ref={inputRef}
      />
      <button
        className="p-2 text-sm text-white bg-green-400 rounded shadow-md"
        onClick={focusInput}
      >
        포커스 주기
      </button>
    </div>
  );
};

export default MyComponent;
