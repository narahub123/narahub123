import { FC, useEffect } from "react";

export type InvalidMessageProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const InvalidMessage: FC<InvalidMessageProps> = ({
  message,
  setMessage,
}) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <div className="absolute flex items-center justify-center w-[80%] p-4 text-white -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-lg top-1/2 left-1/2">
      {message}
    </div>
  );
};
