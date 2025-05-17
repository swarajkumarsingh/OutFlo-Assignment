import mongoose, { Mongoose } from "mongoose";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mongoURL = process.env.DB_URL;

if (!mongoURL) {
  throw new Error("DB_URL environment variable is not defined");
}

mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;

let isConnected: number;
let isDbConnectionRequested = false;

const connectToDatabase = async (): Promise<void> => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  if (isDbConnectionRequested) {
    console.log("=> database connection already requested");
    return;
  }

  console.log("=> using new database connection");
  isDbConnectionRequested = true;

  try {
    const db: Mongoose = await mongoose.connect(mongoURL);
    isConnected = db.connections[0].readyState;
    console.log("Connected to DB");
  } catch (err: any) {
    if (err.code === "ECONNREFUSED") {
      console.log("Internet not connected");
    } else {
      console.error("Error connecting to DB:", err);
    }
    process.exit(1);
  }
};

export default connectToDatabase;
