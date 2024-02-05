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
      const user = await this.userService.getOneBySearchOptions({email: req.body.email}, [], {id: true});
      if (user) throw new CustomError("UC-ALRDY-EXIST", 400);
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
      const user:UserEntity = await this.userService.getOneById(req.user.userId, [], {id: true})
      if (!user) throw new CustomError("UC-USER-NOTFIND", 400);
      return this.userService.update(user.id, req.body);
    });
  }

  async resetPwd(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user:UserEntity = await this.userService.getOneBySearchOptions({email: req.body.email}, [], {id: true, password: true})
      if (!user) throw new CustomError("UC-USER-NOTFIND", 400);
      return this.userService.update(user.id, req.body.password);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.delete(+req.params.id);
    });
  }
}