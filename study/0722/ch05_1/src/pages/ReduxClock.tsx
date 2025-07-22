import { useDispatch, useSelector } from "react-redux";
import { Div, Subtitle, Title } from "../components";
import { AppState } from "../store";
import { useInterval } from "../hooks";

export const ReduxClock = () => {
  const today = useSelector<AppState, Date>((state) => state.today);
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch({ type: "setToday", today: new Date() });
  });

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-5xl">Redux Clock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">
        {today.toLocaleDateString()}
      </Subtitle>
    </Div>
  );
};
