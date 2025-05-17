import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "./response";
import * as statusCode from "../../constants/statusCode";

export const requestValidator = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const errorFields = errors.array().map((data) => data.msg);

      errorResponse(res, `${errors.array()[0].msg}`, statusCode.BAD_REQUEST, {
        details: `Missing or Invalid Arguments: ${errorFields}`,
      });
    } catch (error) {
      const errorFields = errors.array().map((data) => data.msg);
      errorResponse(res, `Missing or Invalid Arguments`, statusCode.BAD_REQUEST, {
        details: errorFields,
      });
    }
  } else {
    next();
  }
};
