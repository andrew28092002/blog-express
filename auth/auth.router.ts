import { Router } from "express";
import authController from "./auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.get("/refresh", authMiddleware, authController.refreshTokens);
authRouter.get("/logout", authMiddleware, authController.logout);

export { authRouter };
