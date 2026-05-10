import { AUTH_MESSAGE_ERRORS } from "../constants/auth.constant";
import { BadRequestException } from "../exceptions/badRequest.exception";
import { UserData } from "../types/user.type";
import { generate } from "../utils/generate";
import { hashPassword, verifyPassword } from "../utils/hashing";
import { jwtService } from "./jwt.service";
import { userService } from "./user.service";

import { JwtPayload } from "jsonwebtoken";
import { redisClient } from "../utils/redis";
import { CACHE_KEY } from "../constants/cache.constant";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

export const authService = {
  async register(userData: UserData) {
    //Check email exist ==> Checked in validateMiddleware
    const { password } = userData;
    //Hash password
    const passwordHash = hashPassword(password);

    //Generate secretId
    const secretId = generate.secretId();

    //Create user in database
    const user = await userService.create({
      ...userData,
      password: passwordHash,
      secretId,
    });
    if (!user) {
      throw new BadRequestException(AUTH_MESSAGE_ERRORS.REGISTER.FAILED);
    }
    //Generate OTP
    const otp = generate.otp();
    //Send Email (setup redis, queue, worker)<Làm sau khi hoàn thành UI>
    console.log(otp);

    const { password: _, id: __, secretId: _id, ...newUser } = user;
    //Return
    return {
      _id,
      ...newUser,
    };
  },
  async login(email: string, password: string) {
    //Find user by email
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException(AUTH_MESSAGE_ERRORS.LOGIN.INCORRECT);
    }
    //verify password
    const passwordHash = user.password;
    const isVerifyPassword = verifyPassword(password, passwordHash);
    if (!isVerifyPassword) {
      throw new BadRequestException(AUTH_MESSAGE_ERRORS.LOGIN.INCORRECT);
    }
    //verified email
    // if (!user.isVerified) {
    //   throw new BadRequestException(AUTH_MESSAGE_ERRORS.LOGIN.NOT_VERIFIED);
    // }
    //create accessToken, refreshToken
    const { secretId: _id, password: _, id: __, ...safeUser } = user;
    const accessToken = jwtService.createAccessToken(_id);
    const refreshToken = jwtService.createRefreshToken(_id);

    //saveRefreshTokenOnRedis
    await this.saveRefreshTokenInRedis(accessToken, refreshToken);
    //return
    return {
      accessToken,
      refreshToken,
      _id,
      ...safeUser,
    };
  },

  async logout(accessToken: string) {
    const decodedAccess = jwtService.verifiedAccessToken(
      accessToken,
    ) as JwtPayload;

    //add accessToken in black list
    await this.addTokenInBlacklist(decodedAccess);

    //del refreshToken bổ sung sau khi xong UI
  },
  async refreshToken(refreshToken: string) {
    //verified refreshToken
    const decodedRefresh = jwtService.verifiedRefreshToken(
      refreshToken,
    ) as JwtPayload;
    if (!decodedRefresh) {
      throw new UnauthorizedException(AUTH_MESSAGE_ERRORS.TOKEN_INVALID);
    }
    //check key exist in redis
    const oldRedisKey = CACHE_KEY.REFRESH_TOKEN(
      decodedRefresh.secretId,
      decodedRefresh.jti!,
    );
    const redisRefresh = await redisClient.get(oldRedisKey);
    if (!redisRefresh) {
      throw new UnauthorizedException(AUTH_MESSAGE_ERRORS.TOKEN_INVALID);
    }
    await redisClient.del(oldRedisKey);
    //create new accessToken, refreshToken
    const newAccessToken = jwtService.createAccessToken(
      decodedRefresh.secretId,
    );
    const newRefreshToken = jwtService.createRefreshToken(
      decodedRefresh.secretId,
    );
    // save token in redis
    await this.saveRefreshTokenInRedis(newAccessToken, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },
  saveRefreshTokenInRedis(accessToken: string, refreshToken: string) {
    const decodedAccess = jwtService.decodedToken(accessToken) as JwtPayload;
    const decodedRefresh = jwtService.decodedToken(refreshToken) as JwtPayload;
    //key = refreshToken:${secretId}:${refreshJti}
    const redisKey = CACHE_KEY.REFRESH_TOKEN(
      decodedRefresh.secretId,
      decodedRefresh.jti!,
    );
    //value = {"access": "${accessJit}", "refresh": "${refreshJit}" }
    const redisValue = JSON.stringify({
      access: decodedAccess.jti,
      refresh: decodedRefresh.jti,
    });
    const ttl = Math.floor(decodedRefresh.exp! - Date.now() / 1000);
    return redisClient.setEx(redisKey, ttl, redisValue);
  },
  addTokenInBlacklist(decodedAccess: JwtPayload) {
    const blacklistAccessKey = CACHE_KEY.BLACK_LIST_ACCESS_TOKEN(
      decodedAccess.secretId,
      decodedAccess.jti!,
    );
    const ttl = Math.floor(decodedAccess.exp! - Date.now() / 1000);
    return redisClient.setEx(blacklistAccessKey, ttl, "true");
  },
};
