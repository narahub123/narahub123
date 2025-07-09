import "./App.css";
import DragDrop from "./pages/DragDrop";
import EventBubbling from "./pages/EventBubbling";
import EventListener from "./pages/EventListener";
import FileInput from "./pages/FileDrop";
import ReactOnClick from "./pages/ReactOnClick";

const App = () => {
  return (
    <div>
      {/* <EventListener />
      <ReactOnClick />
      <EventBubbling />
      <FileInput /> */}
      <DragDrop />
    </div>
  );
};

export default App;
