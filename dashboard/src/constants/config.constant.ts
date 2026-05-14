export const CONFIG = {
  SERVER_API: process.env.NEXT_PUBLIC_SERVER_API,
  DASHBOARD: "/dashboard",
  LOGIN() {
    return `${this.DASHBOARD}/auth/login`;
  },
  CATEGORIES() {
    return `${this.DASHBOARD}/categories`;
  },
};
