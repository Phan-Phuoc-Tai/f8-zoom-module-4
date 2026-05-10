export const CACHE_KEY = {
  REFRESH_TOKEN(secretId: string, refreshJti: string) {
    return `refreshToken:${secretId}:${refreshJti}`;
  },
  BLACK_LIST_ACCESS_TOKEN(secretId: string, accessJti: string) {
    return `blacklist:${secretId}:${accessJti}`;
  },
};
