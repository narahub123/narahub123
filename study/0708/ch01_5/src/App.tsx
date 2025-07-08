import React from "react";
import "./App.css";
import * as D from "./data";

export default function App() {
  return (
    <div>
      <p>
        {D.randomName()}, {D.randomJobTitle()}, {D.randomDayMonthYear()}
      </p>
      <img src={D.randomAvata()} height={50} alt="avatar" />
      <img src={D.randomImage()} height={300} alt="random" />
    </div>
  );
}
