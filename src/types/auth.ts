export interface UserDetail {
  id: number;
  username: string;
}

export interface AuthTokens {
  refresh: string;
  access: string;
  user?: UserDetail;
}
