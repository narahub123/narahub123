import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "../store";

const Counter: FC = () => {
  const dispatch = useAppDispatch();

  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(decrementByAmount(5))}>-5</button>
    </div>
  );
};

export default Counter;
