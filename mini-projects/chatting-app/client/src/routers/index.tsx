import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Fragment } from "react/jsx-runtime";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/callback",
      children: [
        {
          path: "oauth",
          element: <Fragment />,
        },
      ],
    },
  ],
  {
    basename: "/narahub123/chatting-app",
  }
);
