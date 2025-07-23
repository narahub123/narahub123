import "./App.css";
import { Provider as ReduxProvider, useStore } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";
import { Board } from "./pages";
import { useListEntitiesStore } from "./store/useListEntitiesStore";
import { useListidOrdersStore } from "./store";

function App() {
  const list = useListEntitiesStore((state) => state.listEntities);

  const listOrder = useListidOrdersStore((state) => state.listidOrders);

  console.log(list, listOrder);

  return (
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  );
}

export default App;
