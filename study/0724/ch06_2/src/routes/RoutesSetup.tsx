import { Route, Routes } from "react-router-dom";
import { Board } from "../pages";
import Layout from "./Layout";
import LandingPage from "./LandingPage";
import { NoMatch } from "./NoMatch";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
