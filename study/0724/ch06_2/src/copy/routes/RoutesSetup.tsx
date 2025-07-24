import { Route, Routes } from "react-router-dom";
import { NoMatch } from "./NoMatch";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
