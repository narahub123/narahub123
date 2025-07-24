import { Route, Routes } from "react-router-dom";
import { Board } from "../pages";
import Layout from "./Layout";
import LandingPage from "./LandingPage";
import { NoMatch } from "./NoMatch";
import { Login, Logout, SignUp } from "./Auth";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
