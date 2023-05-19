import { NextFunction, Request, Response } from "express";
import userService from "./user.service.js";

class UserController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();

      return users;
    } catch (e) {
        next(e)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findOne(req.params.id);

      return users;
    } catch (e) {
        next(e)
    }
  }
}

export default new UserController();
