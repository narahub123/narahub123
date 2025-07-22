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
    <Div className="">
      <Title>Redux Clock</Title>
      <Title>{today.toLocaleTimeString()}</Title>
      <Subtitle>{today.toLocaleDateString()}</Subtitle>
    </Div>
  );
};
