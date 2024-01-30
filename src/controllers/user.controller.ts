import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities/user.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import bcrypt from "bcrypt";

export class UserController extends GlobalController {

  private userService = new Service(UserEntity)

  private async __hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.getAll();
    });
  }

  async getInfosUserConnected(req:Request, res:Response, next:NextFunction) {
    await this.handleGlobal(req, res, next, async ()=> {
      return this.userService.getOneById(+req.user.userId, [ "projects", "myOwnTasks", "participations"]);
    })
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      req.body.password = await this.__hashPassword(req.body.password)
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