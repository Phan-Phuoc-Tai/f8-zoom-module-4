import { Response } from "express";

const errorResponse = (
  response: Response,
  message: string | Record<string, string>,
  status = 500,
) => {
  response.status(status).json({
    success: false,
    message,
    data: null,
  });
};

const successResponse = (
  response: Response,
  data: unknown,
  message: string,
  status = 200,
  meta?: {
    total: number;
    currentPage: number;
  },
) => {
  response.status(status).json({
    success: true,
    message,
    data,
    meta,
  });
};

export { errorResponse, successResponse };
