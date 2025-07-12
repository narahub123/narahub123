import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "test",
    children: [
      {
        path: "memory-game",
        element: <div></div>,
      },
    ],
  },
]);

export default router;
