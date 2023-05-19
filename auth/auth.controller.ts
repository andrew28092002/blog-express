import { Request, Response } from "express";
import { CustomRequest } from "../index.js";
import authService from "./auth.service.js";
import { CreateUserDto } from "./dto/createUser.dto.js";
import { AuthUserDto } from "./dto/authUser.dto.js";

export class AuthController {
  async signUp(req: CustomRequest<CreateUserDto>, res: Response) {
    const tokens = await authService.signUp(req.body);

    res.status(200).json(tokens);
  }

  async signIn(req: CustomRequest<AuthUserDto>, res: Response) {
    const tokens = await authService.signIn(req.body);

    res.status(200).json(tokens);
  }

  async logout(req: Request, res: Response) {
    await authService.logout(req.headers.authorization as string);

    res.status(200);
  }

  async refreshTokens(req: Request, res: Response) {
    const tokens = await authService.refreshTokens(req.headers.authorization!);

    res.status(200).json(tokens);
  }
}

export default new AuthController()