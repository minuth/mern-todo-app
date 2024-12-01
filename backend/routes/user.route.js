import express from "express";
import auth from "../middleware/auth.middleware.js";
import { userController } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/me", auth, userController.info);

export default userRouter;
