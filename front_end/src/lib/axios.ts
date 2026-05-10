import {
  getAccessTokenAction,
  refreshTokenAction,
} from "@/actions/auth.action";
import { CONFIG } from "@/constants/config.constant";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: CONFIG.SERVER_API,
});

axiosInstance.interceptors.request.use(async (config) => {
  //get accessToken by server Action
  const accessToken = await getAccessTokenAction();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: null | Promise<
  | {
      accessToken: string;
      refreshToken: string;
    }
  | boolean
> = null;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.status === 401) {
      if (!refreshPromise) {
        refreshPromise = refreshTokenAction();
      }
      const isRefresh = await refreshPromise;
      refreshPromise = null;
      if (isRefresh) {
        return axiosInstance(error.config);
      } else if (!window.location.href.includes(`/auth/login`)) {
        window.location.href = "/auth/login";
        return;
      }
    }
    return Promise.reject(error);
  },
);
