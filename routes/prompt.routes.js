import express from "express";
import { generatePrompt } from "../controller/prompt.controller";

const router = express.Router();

router.post("/personalized-message", generatePrompt);

export default router;
