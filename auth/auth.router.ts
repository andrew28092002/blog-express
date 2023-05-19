import { Router } from "express";
import authController from "./auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.get("/refresh", authController.refreshTokens);
authRouter.get("/logout", authController.logout);

export { authRouter };
