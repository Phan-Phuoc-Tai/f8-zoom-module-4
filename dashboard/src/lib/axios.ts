import { CONFIG } from "@/constants/config.constant";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: CONFIG.SERVER_API,
});

axiosInstance.interceptors.request.use(async (config) => {
  //get accessToken by server Action
  // const accessToken = await getAccessTokenAction();
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }
  return config;
});
