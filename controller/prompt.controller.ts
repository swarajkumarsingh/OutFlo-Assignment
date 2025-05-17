import { Request, Response } from "express";
import * as promptModel from "../models/prompt.model";

export const generatePrompt = async (req: Request, res: Response): Promise<void> => {
  const response = await promptModel.generatePromptFromLinkedInData(req.body);

  if (response && "data" in response) {
    res.status(200).json({ success: true, data: response.data });
  } else if (response && "invalid" in response) {
    res.status(404).json({ success: false, error: response.invalid });
  } else {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
