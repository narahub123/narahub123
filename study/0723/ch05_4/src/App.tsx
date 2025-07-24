import "./App.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";
import { Board } from "./pages";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  );
}

export default App;
