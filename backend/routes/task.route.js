import express from "express";
import { taskController } from "../controllers/task.controller.js";
import auth from "../middleware/auth.middleware.js";

const taskRouter = express.Router();

taskRouter.get("/", auth, taskController.list);
taskRouter.post("/", auth, taskController.add);
taskRouter.delete("/:id", auth, taskController.remove);
taskRouter.put("/:id", auth, taskController.update);

export default taskRouter;
