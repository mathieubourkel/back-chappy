import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities/user.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import bcrypt from "bcrypt";
import { CompanyEntity } from "../entities/company.entity";
import { CustomError } from "../middlewares/error.handler.middleware";

export class UserController extends GlobalController {

  private userService = new Service(UserEntity)
  private companyService = new Service(CompanyEntity)

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
      return this.userService.getOneById(+req.user.userId, [ "projects", "myOwnTasks", "participations", "company", "myCompany"]);
    })
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      req.body.password = await this.__hashPassword(req.body.password)
      const result:UserEntity = await this.userService.create(req.body);
      if (!result) throw new CustomError("UC-FAILED-CREA", 400);
      const datasCompany = {name: req.body.name, siret: req.body.siret, description: req.body.description, owner: result.id}
      if (req.body.name) await this.companyService.create(datasCompany)
      return result; 
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