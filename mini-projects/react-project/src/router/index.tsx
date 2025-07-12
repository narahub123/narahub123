import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages";
import { MemoryGame } from "../features";

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
        element: <MemoryGame />,
      },
    ],
  },
]);

export default router;
