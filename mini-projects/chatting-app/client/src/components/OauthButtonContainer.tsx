import { FC } from "react";
import { OauthButton } from "../components";
import { oauths } from "../data";
import { OauthType } from "../types";
import { SERVER_URL } from "../constants";

const OauthButtonContainer: FC = () => {
  // Oauth 회원 가입
  const handleSocialSignup = (social: OauthType) => {
    const oauth = oauths[social];

    const url = `${oauth.url}?client_id=${oauth.client_id}&redirect_uri=${SERVER_URL}/auth/oauth&response_type=code&scope=${oauth.scope}&state=${oauth.type}&prompt=${oauth.prompt}&access_type=${oauth.access_type}`;

    window.open(url, "oauth", "popup");
  };
  return (
    <div className="flex items-center gap-8">
      {Object.values(oauths).map((oauth) => (
        <OauthButton
          key={oauth.client_id}
          oauth={oauth}
          onClick={() => handleSocialSignup(oauth.type)}
        />
      ))}
    </div>
  );
};

export default OauthButtonContainer;
