import { Response, NextFunction } from "express";
import * as statusCode from "../../constants/statusCode";

interface ErrorResponse {
  success: false;
  error: string;
  [key: string]: any;
}

interface SuccessResponse {
  success: true;
  message: string;
  data: any;
  [key: string]: any;
}

const errorResponseGenerator = (message: string, extra: object = {}): ErrorResponse => {
  return {
    success: false,
    error: message || "Something went wrong",
    ...extra,
  };
};

const successResponseGenerator = (message: string, data: any, extra: object = {}): SuccessResponse => {
  return {
    success: true,
    message: message || "Operation Successful",
    data: data || {},
    ...extra,
  };
};

declare global {
  namespace Express {
    interface Response {
      successResponse: (message?: string, data?: any, extra?: object) => Response;
      errorResponse: (message?: string, stCode?: number, extra?: object) => Response;
      notFoundResponse: (message?: string, extra?: object) => Response;
      invalidResponse: (message?: string, extra?: object) => Response;
      alreadyExistsResponse: (message?: string, extra?: object) => Response;
      internalErrorResponse: (message?: string, extra?: object) => Response;
    }
  }
}

function successResponse(this: Response, message?: string, data?: any, extra: object = {}): Response {
  return this.status(statusCode.STATUS_OK).json(successResponseGenerator(message || "Operation Successful", data, extra));
}

function errorResponse(this: Response, message?: string, stCode?: number, extra: object = {}): Response {
  return this.status(stCode || statusCode.BAD_REQUEST).json(errorResponseGenerator(message || "An error occurred", extra));
}

function notFoundResponse(this: Response, message?: string, extra: object = {}): Response {
  return this.status(statusCode.NOT_FOUND).json(errorResponseGenerator(message || "Resource not found", extra));
}

function invalidResponse(this: Response, message?: string, extra: object = {}): Response {
  return this.status(statusCode.BAD_REQUEST).json(errorResponseGenerator(message || "Invalid request", extra));
}

function alreadyExistsResponse(this: Response, message?: string, extra: object = {}): Response {
  return this.status(statusCode.ALREADY_EXISTS).json(errorResponseGenerator(message || "Resource already exists", extra));
}

function internalErrorResponse(this: Response, message?: string, extra: object = {}): Response {
  return this.status(statusCode.SOMETHING_WENT_WRONG).json(errorResponseGenerator(message || "Internal server error", extra));
}

export const responseHandlers = () => {
  return (_: any, __: Response, next: NextFunction) => {
    Object.assign(Response.prototype, {
      successResponse,
      errorResponse,
      notFoundResponse,
      invalidResponse,
      alreadyExistsResponse,
      internalErrorResponse,
    });

    next();
  };
};
