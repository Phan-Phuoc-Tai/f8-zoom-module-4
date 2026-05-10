import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { ErrorWithStatus } from "../types/error.type";

export const errorHandlerMiddleware = (
  error: ErrorWithStatus,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const message = error.message || "Server error";
  const status = error.status || 500;
  errorResponse(response, message, status);
  next();
};
