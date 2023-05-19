import { Router } from "express";
import userController from "./user.controller.js";


const userRouter = Router();

userRouter.get("/getAll", userController.findAll);

export { userRouter };
