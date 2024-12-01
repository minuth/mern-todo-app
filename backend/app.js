import express from "express";
import logger from "morgan";
import userRouter from "./routes/user.route.js";
import { loadConfiguration } from "./config/config.js";
import taskRouter from "./routes/task.route.js";
import cors from "cors";

loadConfiguration();
const app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

export default app;
