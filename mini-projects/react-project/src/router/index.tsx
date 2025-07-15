import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages";
import { DragAndDrop, LadderGame, MemoryGame } from "../features";

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
        {
          path: "ladder-game",
          element: <LadderGame />,
        },
      ],
    },
  ],
  {
    basename: "/narahub123",
  }
);

export default router;
