import { Request, Response } from "express";
import * as promptModel from "../models/prompt.model";
import { successResponse, invalidResponse, internalErrorResponse } from "../utils/middlewares/response";

export const generatePrompt = async (req: Request, res: Response): Promise<void> => {
  const response = await promptModel.generatePromptFromLinkedInData(req.body);

  if (response && "data" in response) {
    successResponse(res, "Prompt generated successfully", response.data);
  } else if (response && "invalid" in response) {
    invalidResponse(res, response.invalid);
  } else {
    internalErrorResponse(res, "Failed to generate prompt");
  }
};
