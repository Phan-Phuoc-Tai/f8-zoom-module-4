import { axiosInstance } from "@/lib/axios";

export const profileService = {
  async getProfile() {
    const response = await axiosInstance.get("/profile");
    return response.data.data;
  },
};
