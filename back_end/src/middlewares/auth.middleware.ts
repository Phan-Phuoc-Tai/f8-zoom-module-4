import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { jwtService } from "../services/jwt.service";
import { JwtPayload } from "jsonwebtoken";
import { AUTH_MESSAGE_ERRORS } from "../constants/auth.constant";
import { CACHE_KEY } from "../constants/cache.constant";
import { redisClient } from "../utils/redis";

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const accessToken = request.headers["authorization"]
    ?.split(" ")
    .slice(-1)
    .join();
  if (!accessToken) {
    throw new UnauthorizedException(AUTH_MESSAGE_ERRORS.TOKEN_INVALID);
  }
  //verified accessToken
  const decodedAccess = jwtService.verifiedAccessToken(
    accessToken,
  ) as JwtPayload;
  if (!decodedAccess) {
    throw new UnauthorizedException(AUTH_MESSAGE_ERRORS.TOKEN_INVALID);
  }
  //check blacklist accessToken
  const redisKey = CACHE_KEY.BLACK_LIST_ACCESS_TOKEN(
    decodedAccess.secretId,
    decodedAccess.jti!,
  );
  const blacklistAccess = await redisClient.get(redisKey);
  if (blacklistAccess) {
    throw new UnauthorizedException(AUTH_MESSAGE_ERRORS.TOKEN_INVALID);
  }

  request.accessToken = accessToken;
  request.secretId = decodedAccess.secretId;
  next();
};
