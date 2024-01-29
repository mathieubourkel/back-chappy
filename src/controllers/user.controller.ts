import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";
import bcrypt from "bcrypt";
import { CreateUserDto } from "../dto/user.dto";
import { validate } from "class-validator";

export class UserController extends GlobalController {

  private userService = new Service(User)

  private async __hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  // async getAll(req: Request, res: Response, next: NextFunction) {
  //   await this.handleGlobal(req, res, next, async () => {
  //     return this.userService.getAll();
  //   });
  // }

  async getInfosUserConnected(req:Request, res:Response, next:NextFunction) {
    await this.handleGlobal(req, res, next, async ()=> {
      return this.userService.getOneById(+req.user.userId, [ "projects", "myOwnTasks", "participations"]);
    })
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const userDto: any = new CreateUserDto(req.body)
      const errors = await validate(userDto)
      if (errors.length > 0) {
        throw new CustomError("UC-DTO-CHECK", 400)
      }
      userDto.password = await this.__hashPassword(req.body.password)
      return this.userService.create(userDto);
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