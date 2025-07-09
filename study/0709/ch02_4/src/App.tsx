import "./App.css";
import EventBubbling from "./pages/EventBubbling";
import EventListener from "./pages/EventListener";
import ReactOnClick from "./pages/ReactOnClick";

const App = () => {
  return (
    <div>
      <EventListener />
      <ReactOnClick />
      <EventBubbling />
    </div>
  );
};

export default App;
