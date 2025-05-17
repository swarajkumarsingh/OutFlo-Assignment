import { Response } from "express";
import * as statusCodes from "../../constants/statusCode";

export const successResponse = (
  res: Response,
  message: string = "Operation successful",
  data: any = {},
  extra: Record<string, any> = {}
): Response => {
  return res.status(statusCodes.STATUS_OK).json({
    success: true,
    message,
    data,
    ...extra,
  });
};

export const errorResponse = (
  res: Response,
  error: string = "An error occurred",
  statusCode: number = statusCodes.BAD_REQUEST,
  extra: Record<string, any> = {}
): Response => {
  return res.status(statusCode).json({
    success: false,
    error,
    ...extra,
  });
};

export const notFoundResponse = (
  res: Response,
  error: string = "Resource not found",
  extra: Record<string, any> = {}
): Response => {
  return res.status(statusCodes.NOT_FOUND).json({
    success: false,
    error,
    ...extra,
  });
};

export const invalidResponse = (res: Response, error: string = "Invalid request", extra: Record<string, any> = {}): Response => {
  return res.status(statusCodes.BAD_REQUEST).json({
    success: false,
    error,
    ...extra,
  });
};

export const alreadyExistsResponse = (
  res: Response,
  error: string = "Resource already exists",
  extra: Record<string, any> = {}
): Response => {
  return res.status(statusCodes.ALREADY_EXISTS).json({
    success: false,
    error,
    ...extra,
  });
};

export const internalErrorResponse = (
  res: Response,
  error: string = "Internal server error",
  extra: Record<string, any> = {}
): Response => {
  return res.status(statusCodes.SOMETHING_WENT_WRONG).json({
    success: false,
    error,
    ...extra,
  });
};
