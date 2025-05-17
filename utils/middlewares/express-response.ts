import { Request, Response, NextFunction } from "express";

export const errorResponseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.errorResponse = (message: string, statusCode = 400, additionalData?: any) => {
    return res.status(statusCode).json({
      success: false,
      error: message,
      ...additionalData,
    });
  };

  next();
};
