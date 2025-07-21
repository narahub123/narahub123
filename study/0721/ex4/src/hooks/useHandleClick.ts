import React, { useCallback } from "react";

export const useHandleClick = (
  setCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return handleClick;
};
