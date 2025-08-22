import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>홈</>,
  },
  {
    path: "/admin",
    element: <>관리자</>,
  },
]);
