import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { successResponse } from "../utils/response";
import { AUTH_MESSAGE_SUCCESS } from "../constants/auth.constant";
export const authController = {
  register: async (request: Request, response: Response) => {
    const { confirmPassword: _, ...userData } = request.body;
    const user = await authService.register(userData);
    successResponse(response, user, AUTH_MESSAGE_SUCCESS.REGISTER, 201);
  },
  login: async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = await authService.login(email, password);
    successResponse(response, user, AUTH_MESSAGE_SUCCESS.LOGIN, 200);
  },
  refreshToken: async (request: Request, response: Response) => {
    const { refreshToken } = request.body;
    const token = await authService.refreshToken(refreshToken);
    successResponse(response, token, AUTH_MESSAGE_SUCCESS.LOGIN, 200);
  },
  logout: async (request: Request, response: Response) => {
    await authService.logout(request.accessToken!);
    successResponse(response, null, AUTH_MESSAGE_SUCCESS.LOGOUT, 200);
  },
};
