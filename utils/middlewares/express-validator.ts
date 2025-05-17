import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const statusCode = {
  BAD_REQUEST: 400,
};

declare global {
  namespace Express {
    interface Response {
      errorResponse: (message: string, statusCode?: number, additionalData?: any) => Response;
    }
  }
}

export const requestValidator = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const errorFields = errors.array().map((data) => data.msg);

      res.errorResponse(`${errors.array()[0].msg}`, statusCode.BAD_REQUEST, {
        data: `Missing or Invalid Arguments ${errorFields}`,
      });
    } catch (error) {
      const errorFields = errors.array().map((data) => data.msg);
      res.errorResponse(`Missing or Invalid Arguments ${errorFields}`);
    }
  } else {
    next();
  }
};
