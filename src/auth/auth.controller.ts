import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../app.ts";
import authService from "./auth.service.ts";
import { CreateUserDto } from "./dto/createUser.dto.ts";
import { AuthUserDto } from "./dto/authUser.dto.ts";

export class AuthController {
  async signUp(
    req: CustomRequest<CreateUserDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tokens = await authService.signUp(req.body);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json(tokens);
    } catch (e) {
      next(e);
    }
  }

  async signIn(
    req: CustomRequest<AuthUserDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tokens = await authService.signIn(req.body);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(tokens);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.cookies.refreshToken as string);

      res.status(200).json({ message: "Success logout" });
    } catch (e) {
      next(e);
    }
  }

  async refreshTokens(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await authService.refreshTokens(req.cookies.refreshToken);

      res.status(200).json(tokens);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.delete(req.cookies.refreshToken);

      res.status(200).json({ message: 'Success deleted'});
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
