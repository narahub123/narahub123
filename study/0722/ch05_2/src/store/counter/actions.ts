import type * as T from "./types";

export const setCount = (payload: T.State) => ({
  type: "@counter/setCounter",
  payload,
});

export const increaseCounter = () => setCount(1);
export const decreaseCounter = () => setCount(-1);
