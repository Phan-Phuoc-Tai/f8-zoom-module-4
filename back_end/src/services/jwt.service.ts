import jwt from "jsonwebtoken";
import { CONFIG } from "../constants/config.constant";

export const jwtService = {
  createAccessToken(secretId: string) {
    const payload = {
      secretId,
      jti: crypto.randomUUID(),
    };
    return jwt.sign(payload, CONFIG.JWT_SECRET, {
      expiresIn: CONFIG.JWT_EXPIRED,
    });
  },

  createRefreshToken(secretId: string) {
    const payload = {
      secretId,
      jti: crypto.randomUUID(),
    };
    return jwt.sign(payload, CONFIG.JWT_REFRESH_SECRET, {
      expiresIn: CONFIG.JWT_REFRESH_EXPIRED,
    });
  },

  decodedToken(token: string) {
    return jwt.decode(token);
  },

  verifiedAccessToken(accessToken: string) {
    try {
      const decoded = jwt.verify(accessToken, CONFIG.JWT_SECRET);
      return decoded;
    } catch {
      return false;
    }
  },
  verifiedRefreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, CONFIG.JWT_REFRESH_SECRET);
      return decoded;
    } catch {
      return false;
    }
  },
};
