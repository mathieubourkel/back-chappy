import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class UserController extends GlobalController {

  private userService = new Service(User)

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.getAll();
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.delete(+req.params.id);
    });
  }
}