import { Route, Routes } from "react-router-dom";
import { Board } from "../pages";
import Layout from "./Layout";
import LandingPage from "./LandingPage";
import { NoMatch } from "./NoMatch";
import { Login, Logout, RequireAuth, SignUp } from "./Auth";
import { Card } from "./Card";
import RestTest from "./RestTest";
import { Oauth } from "../pages/Callback";

export const RoutesSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/rest" element={<RestTest />} />
        <Route
          path="/board"
          element={
            // 로그인한 사용자만 볼 수 있는 페이지
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
        <Route
          path="/board/card/:cardid"
          element={
            // 로그인한 사용자만 볼 수 있는 페이지
            <RequireAuth>
              <Card />
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
      <Route path="/callback">
        <Route path="oauth" element={<Oauth />} />
      </Route>
    </Routes>
  );
};
