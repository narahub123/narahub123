import { useEffect, useRef, useState } from "react";
import "./App.css";
import Clock from "./pages/Clock";

function App() {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    console.log("useEffect called");

    const duration = 1000;

    const id = setInterval(() => {
      setToday(new Date());
      console.log("today", today.toLocaleTimeString());
    }, duration);

    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <Clock today={today} />
    </main>
  );
}

export default App;
