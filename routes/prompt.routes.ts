import express from "express";
import { body } from "express-validator";
import { generatePrompt } from "../controller/prompt.controller";
import { requestValidator } from "../utils/middlewares/express-validator";

const router = express.Router();

router.post(
  "/personalized-message",
  [
    body("name", "Name is required").isLength({ min: 1, max: 300 }),
    body("job_title", "Job Title description is required").isLength({ min: 1, max: 300 }),
    body("company", "Company description is required").isLength({ min: 1, max: 300 }),
    body("location", "Location description is required").isLength({ min: 1, max: 300 }),
    body("summary", "Summary description is required").isLength({ min: 1, max: 3000 }),
    requestValidator,
  ],
  generatePrompt
);

export default router;
