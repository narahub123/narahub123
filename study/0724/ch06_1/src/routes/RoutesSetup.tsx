import { Route, Routes } from "react-router-dom";
import { NoMatch } from "./NoMatch";
import Home from "./Home";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="*" element={<NoMatch />} />
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Home title="Welcome to our site." />} />
    </Routes>
  );
};
