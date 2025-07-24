import { Route, Routes } from "react-router-dom";
import { Board } from "../pages";
import Layout from "./Layout";
import LandingPage from "./LandingPage";
import { NoMatch } from "./NoMatch";
import { Login, Logout, RequireAuth, SignUp } from "./Auth";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="/board"
          element={
            // 로그인한 사용자만 볼 수 있는 페이지
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/logout"
        element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
