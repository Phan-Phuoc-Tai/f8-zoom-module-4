declare module "express" {
  export interface Request {
    accessToken?: string;
    secretId?: string;
  }
}
