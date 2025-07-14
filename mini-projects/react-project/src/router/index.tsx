import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages";
import { DragAndDrop, MemoryGame } from "../features";

const router = createBrowserRouter(
  [
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
        {
          path: "drag-and-drop",
          element: <DragAndDrop />,
        },
      ],
    },
  ],
  {
    basename: "/narahub123",
  }
);

export default router;
