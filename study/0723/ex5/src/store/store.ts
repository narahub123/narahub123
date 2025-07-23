import { configureStore } from "@reduxjs/toolkit";
import { counterSlice as counter, todoSlice as todo } from "./slices";

export const store = configureStore({
  reducer: {
    counter,
    todo,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
