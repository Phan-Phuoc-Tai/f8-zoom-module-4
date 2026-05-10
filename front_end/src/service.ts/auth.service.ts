import { axiosInstance } from "@/lib/axios";
import { UserData } from "@/types/auth.type";

export const authService = {
  async register(userData: UserData) {
    const response = await axiosInstance.post("/auth/register", {
      ...userData,
    });
    return response.data.data;
  },
  async login(
    loginData: Omit<UserData, "username" | "fullName" | "confirmPassword">,
  ) {
    const response = await axiosInstance.post("/auth/login", {
      ...loginData,
    });
    return response.data.data;
  },

  async logout() {
    const response = await axiosInstance.get("/profile");
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await axiosInstance.post("/auth/refresh-token", {
      refreshToken,
    });
    return response.data.data;
  },
};
