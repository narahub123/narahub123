import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OauthCallback = () => {
  const [search] = useSearchParams();

  useEffect(() => {
    const isLoggedIn = search.get("login") === "true";

    console.log(isLoggedIn);

    window.opener.postMessage(
      {
        type: isLoggedIn ? "oauth-success" : "oauth-fail",
        info: isLoggedIn
          ? {
              accessToken: search.get("accessToken"),
              sessionId: search.get("sessionId"),
            }
          : {
              email: search.get("email"),
              username: search.get("username"),
              profileImage: search.get("profileImage"),
            },
      },
      "*"
    );

    window.close();
  }, [search]);

  return <div></div>;
};

export default OauthCallback;
