import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Oauth = () => {
  const [search] = useSearchParams();

  useEffect(() => {
    const isLogin = search.get("login") === "true";

    window.opener.postMessage(
      {
        type: isLogin ? "oauth-success" : "oauth-fail",
        url: isLogin ? "/" : "/signup",
      },
      "*"
    );
    window.close();
  }, [search]);

  return <div></div>;
};
