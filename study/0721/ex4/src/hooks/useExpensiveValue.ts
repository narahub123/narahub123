import { useMemo } from "react";

export const useExpensiveValue = (count: number) => {
  const expensiveValue = useMemo(() => {
    console.log("Expensive calculation...");

    let total = 0;

    for (let i = 0; i <= count; i++) {
      total += i;
    }

    return total;
  }, [count]);

  return expensiveValue;
};
