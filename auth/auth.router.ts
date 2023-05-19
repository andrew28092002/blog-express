import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", authController.signIn);
authRouter.post("/signin", authController.signUp);
authRouter.get("/refresh", authController.refreshTokens);

export { authRouter };
