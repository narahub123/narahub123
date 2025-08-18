export type OauthType = "google" | "kakao" | "naver" | "github";

export type OauthInfoType = {
  type: OauthType;
  logo: string;
  url: string;
  client_id: string;
  scope: string;
  prompt: string;
  access_type?: string
};
