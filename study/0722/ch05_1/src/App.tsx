import "./App.css";
import { ReduxClock } from "./pages/ReduxClock";
import { UseReducerClock } from "./pages/UseReducerClock";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "./store";

function App() {
  const store = useStore();

  return (
    <ReduxProvider store={store}>
      <main>
        <UseReducerClock />
        <ReduxClock />
      </main>
    </ReduxProvider>
  );
}

export default App;
