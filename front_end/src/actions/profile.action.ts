"use server";

import { CONFIG } from "@/constants/config.constant";
import { fetchWrapper } from "@/lib/fetch";
import { User } from "@/types/auth.type";

export const getProfileAction = async (): Promise<User> => {
  const response = await fetchWrapper(`${CONFIG.SERVER_API}/profile`);
  if (!response.ok) {
    throw Error;
  }
  const { data } = await response.json();
  return data;
};
