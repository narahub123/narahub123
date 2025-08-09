import { FC } from "react";
import { OauthInfoType } from "../types";

type OauthButtonProps = {
  oauth: OauthInfoType;
  onClick: () => void;
};

const OauthButton: FC<OauthButtonProps> = ({ oauth, onClick }) => {
  return (
    <button key={oauth.type} onClick={onClick}>
      <img
        src={oauth.logo}
        alt={`${oauth.type} 로고 이미지`}
        style={{ width: 45, aspectRatio: 1 / 1 }}
      />
    </button>
  );
};

export default OauthButton;
