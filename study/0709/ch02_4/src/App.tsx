import "./App.css";
import EventBubbling from "./pages/EventBubbling";
import EventListener from "./pages/EventListener";
import FileInput from "./pages/FileDrop";
import ReactOnClick from "./pages/ReactOnClick";

const App = () => {
  return (
    <div>
      <EventListener />
      <ReactOnClick />
      <EventBubbling />
      <FileInput />
    </div>
  );
};

export default App;
