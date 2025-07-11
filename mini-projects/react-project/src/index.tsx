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
    <Masonry></Masonry>
  </React.StrictMode>
);
