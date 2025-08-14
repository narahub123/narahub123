import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { OauthCallback } from "../components";

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
          element: <OauthCallback />,
        },
      ],
    },
  ],
  {
    basename: "/narahub123/chatting-app",
  }
);
