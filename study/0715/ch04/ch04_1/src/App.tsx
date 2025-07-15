import { useEffect, useRef, useState } from "react";
import "./App.css";
import Clock from "./pages/Clock";
import { useClock } from "./hooks";

function App() {
  return (
    <main>
      <Clock today={useClock()} />
    </main>
  );
}

export default App;
