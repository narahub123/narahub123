import { Route, Routes } from "react-router-dom";
import { NoMatch, Home, Card } from "../routes";
import { Board } from "../pages";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Home title="Welcome to our site." />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/card/:cardid" element={<Card />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
