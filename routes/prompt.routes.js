import express from "express";
import { generatePrompt } from "../controller/prompt.controller";

const router = express.Router();

router.post("/generate", generatePrompt);

export default router;
