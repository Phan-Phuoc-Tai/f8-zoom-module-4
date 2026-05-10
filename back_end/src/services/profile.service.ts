import { PROFILE_ERROR } from "../constants/profile.constant";
import { NotFoundException } from "../exceptions/notFound.exception";
import { userService } from "./user.service";

export const profileService = {
  async profile(secretId: string) {
    const user = await userService.findUserBySecretId(secretId);
    if (!user) {
      throw new NotFoundException(PROFILE_ERROR.NOT_FOUND);
    }
    const { password: _, id: __, secretId: _id, ...newUser } = user;

    return {
      _id,
      ...newUser,
    };
  },
};
