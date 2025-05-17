import app from "./app";
import { config } from "constants/config";

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
