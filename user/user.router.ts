import { Router } from "express";
import userController from "./user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const userRouter = Router();

userRouter.get("/getAll", authMiddleware, userController.findAll);

export { userRouter };
