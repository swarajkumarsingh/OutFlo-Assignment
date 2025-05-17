import express from "express";
import { generateMessage } from "../controllers/linkedinMessageController";

const router = express.Router();

router.post("/", generateMessage);

export default router;
