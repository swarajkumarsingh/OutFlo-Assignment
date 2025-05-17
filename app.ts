import cors from "cors";
import morgan from "morgan";
import express from "express";

import connectDb from "./db/connect";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("common"));

(async () => {
  try {
    await connectDb();
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
})();

import promptRoute from "./routes/prompt.routes";
import campaignRoute from "./routes/campaign.routes";

app.use("/api/v1/", promptRoute);
app.use("/api/v1/", campaignRoute);

export default app;
