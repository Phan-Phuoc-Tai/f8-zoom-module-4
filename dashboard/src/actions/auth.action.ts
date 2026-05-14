"use server";

import { AUTH_CONFIG } from "@/constants/auth.constant";
import { CACHE_TTL } from "@/constants/cache.constant";
import { CONFIG } from "@/constants/config.constant";
import { authService } from "@/services/auth.service";

import { UserData } from "@/types/auth.type";
import { cookies } from "next/headers";

export const loginAction = async (
  userData: Omit<UserData, "username" | "fullName" | "confirmPassword">,
) => {
  const token = await authService.login(userData);
  if (token.role !== "admin") {
    throw new Error(AUTH_CONFIG.LOGIN_ACTION.ERROR);
  }
  await saveTokenInCookieAction(token.accessToken, token.refreshToken);
  return token;
};

export const logoutAction = async () => {
  await authService.logout();
  await delTokenInCookieAction();
};

export const getAccessTokenAction = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

export const refreshTokenAction = async (): Promise<
  | {
      accessToken: string;
      refreshToken: string;
    }
  | boolean
> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return false;
  }
  const response = await fetch(`${CONFIG.SERVER_API}/auth/refresh-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    return false;
  }
  const { data: newToken } = await response.json();
  await saveTokenInCookieAction(newToken.accessToken, newToken.refreshToken);
  return newToken;
};

const saveTokenInCookieAction = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();
  //save 1h
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: CACHE_TTL.TOKEN_1H,
  });

  //save 1h because refreshToken rotation
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: CACHE_TTL.TOKEN_7D,
  });
};

const delTokenInCookieAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
