import { useCounterStore } from "../store";

const Counter = () => {
  const value = useCounterStore((state) => state.value);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const incrementByNumber = useCounterStore((state) => state.incrementByNumber);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div>
      <h2>counter : {value}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={() => incrementByNumber(5)}>+5</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default Counter;
