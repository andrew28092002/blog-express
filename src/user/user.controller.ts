import { NextFunction, Request, Response } from "express";
import userService from "./user.service.js";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();

      res.status(200).json(users)
    } catch (e) {
        next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getOne(req.params.id);

      res.status(200).json(user)
    } catch (e) {
        next(e)
    }
  }
}

export default new UserController();
