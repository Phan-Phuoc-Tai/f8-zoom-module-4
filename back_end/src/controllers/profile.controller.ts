import { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { PROFILE_SUCCESS } from "../constants/profile.constant";
import { profileService } from "../services/profile.service";

export const profileController = {
  profile: async (request: Request, response: Response) => {
    const user = await profileService.profile(request.secretId!);
    successResponse(response, user, PROFILE_SUCCESS.GET_PROFILE, 200);
  },
};
