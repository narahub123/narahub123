export type OauthType = "google" | "kakao" | "github";

export interface OauthInfo {
  client_id: string;
  client_secret?: string;
  token_url: string;
  userInfo_url: string;
}
