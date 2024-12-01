import { configDotenv } from "dotenv";
import { initDatabaseConnection } from "./db-config.js";

export function loadConfiguration() {
  configDotenv();
  initDatabaseConnection();
}
