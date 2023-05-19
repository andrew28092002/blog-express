import { NextFunction, Request, Response } from "express";
import userService from "./user.service.js";

class UserController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();

      res.status(200).json(users)
    } catch (e) {
        next(e)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findOne(req.params.id);

      res.status(200).json(user)
    } catch (e) {
        next(e)
    }
  }
}

export default new UserController();
