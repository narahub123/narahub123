import { Action } from "redux";
import { AppState } from "./AppState";
import { Actions } from "./actions";

const initialState: AppState = {
  today: new Date(),
};

export const rootReducer = (
  state: AppState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case "setToday": {
      return { ...state, today: action.today };
    }
  }

  return state;
};
