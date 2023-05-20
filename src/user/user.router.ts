import { Router } from "express";
import userController from "./user.controller.js";


const userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getOne);

export { userRouter };
