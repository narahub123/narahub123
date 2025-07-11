import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/material-icons";
import { Masonry } from "./layouts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Masonry>
      <p className={`row-span-${5}`}>하나</p>
      <p className={`row-span-${6}`}>둘</p>
      <p className={`row-span-${7}`}>셋</p>
      <p className={`row-span-${6}`}>넷</p>
      <p className={`row-span-${10}`}>다섯</p>
    </Masonry>
  </React.StrictMode>
);
