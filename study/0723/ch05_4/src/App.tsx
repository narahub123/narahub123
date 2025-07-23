import "./App.css";
import { Provider as ReduxProvider, useStore } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";

function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="App"></div>;
      </DndProvider>
    </ReduxProvider>
  );
}

export default App;
