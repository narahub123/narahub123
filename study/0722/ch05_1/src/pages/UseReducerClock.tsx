import { useReducer } from "react";
import { AppState, SetTodayAction } from "../store";
import { useInterval } from "../hooks";
import { Div, Subtitle, Title } from "../components";

export const UseReducerClock = () => {
  const [{ today }, dispatch] = useReducer(
    (state: AppState, action: SetTodayAction) => {
      switch (action.type) {
        case "setToday":
          return { ...state, today: new Date() };
      }

      return state;
    },
    {
      today: new Date(),
    }
  );

  useInterval(() => {
    dispatch({ type: "setToday", today: new Date() });
  });

  return (
    <Div className="flex flex-col items-center justify-center h-24">
      <Title className="text-5xl">UseReducer Clock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">
        {today.toLocaleDateString()}
      </Subtitle>
    </Div>
  );
};

