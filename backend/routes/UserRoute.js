import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/registration", userController.registration);
userRouter.post("/authorization", userController.authorization);
