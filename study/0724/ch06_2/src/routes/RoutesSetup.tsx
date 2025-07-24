import { Route, Routes } from "react-router-dom";
import { NoMatch } from "./NoMatch";
import Layout from "./Layout";
import { Board } from "../pages";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
