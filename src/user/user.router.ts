import { Router } from "express";
import userController from "./user.controller.ts";


const userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getOne);


export { userRouter };
