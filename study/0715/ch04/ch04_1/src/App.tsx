import "./App.css";
import Clock from "./pages/Clock";

function App() {
  const today = new Date();
  return (
    <main>
      <Clock today={today} />
    </main>
  );
}

export default App;
