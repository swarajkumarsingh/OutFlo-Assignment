import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import statusCode from "../statusCode";

interface CustomResponse extends Response {
  errorResponse: (message: string, statusCode?: number, meta?: { [key: string]: any }) => Response;
}

export const requestValidator = (req: Request, res: CustomResponse, next: NextFunction): Response | void => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errorArray = result.array() as ValidationError[];

    console.log("Validation Error:", errorArray);

    const invalidFields = errorArray.map((error) => error.msg);
    const message = errorArray[0].msg;

    return res.errorResponse(message, statusCode.BAD_REQUEST, {
      data: `Missing or Invalid Arguments: ${invalidFields.join(", ")}`,
    });
  }

  next();
};
