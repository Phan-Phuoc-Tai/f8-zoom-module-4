export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET as unknown as string,
  JWT_EXPIRED: process.env.JWT_EXPIRED as unknown as number,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as unknown as string,
  JWT_REFRESH_EXPIRED: process.env.JWT_REFRESH_EXPIRED as unknown as number,
  ALLOWED_ORIGINS: ["http://localhost:3000", "http://localhost:3001"],
};
