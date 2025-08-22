import { createBrowserRouter } from "react-router-dom";
import { AdminPage, HomePage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
