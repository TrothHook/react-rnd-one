export type Tokens = {
  access_tokens: string;
  refresh_tokens: string;
};


export interface TokenPayload {
  userId: number;
  email: string;
  roleId: number;
}