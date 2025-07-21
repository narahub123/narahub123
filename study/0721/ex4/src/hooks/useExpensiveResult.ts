import { useMemo } from "react";
import { slowFunction } from "../utils";

export const useExpensiveResult = (count: number) => {
  const expensiveResult = useMemo(() => {
    return slowFunction(count);
  }, [count]);

  return expensiveResult;
};
