import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { useMemo } from "react";

const useLogger = process.env.NODE_ENV !== "production";

const initializeStore = () => {
  const middleware: any[] = []; // 중복 적용을 제거하기 위해 thunk 제거

  if (useLogger) {
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
  });

  return store;
};

export const useStore = () => {
  // 왜 useMemo 적용?
  const store = useMemo(() => initializeStore(), []);

  return store;
};
