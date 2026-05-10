import { getAccessTokenAction } from "@/actions/auth.action";

export const fetchWrapper = async (
  url: string,
  options = {} as RequestInit,
) => {
  const accessToken = await getAccessTokenAction();
  const allHeaders = new Headers(options?.headers || {});
  if (accessToken) {
    allHeaders.set("Authorization", accessToken!);
  }
  return fetch(url, {
    ...options,
    headers: allHeaders,
  });
};
