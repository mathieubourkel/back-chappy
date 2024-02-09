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

  async companyRejoin(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.update(+req.user.userId, {company: +req.body.id},['company']);
    });
  }

  async resetPwd(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user:UserEntity = await this.userService.getOneBySearchOptions({email: req.body.email}, [], {id: true, password: true})
      if (!user) throw new CustomError("UC-USER-NOTFIND", 400);
      const isPasswordMatched:boolean = await this.__decryptPassword(req.body.oldPassword, user.password);
      if (!isPasswordMatched) throw new CustomError("AUTH-C", 401, "Bad Credentials");
      req.body.newPassword = await this.__hashPassword(req.body.newPassword)
      return this.userService.update(user.id, {password: req.body.newPassword});
    });
  }

  
  async quitCompany(req: Request, res: Response, next: NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async () => {
      const user:UserEntity = await this.userService.getOneById<UserEntity>(+req.user.userId,["company"]);
      if (!user) throw new CustomError("UC-DEL-NOTFIND", 400);
      user.company.id = null
      return await this.userService.update(user.id, user, ["company"]);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.userService.delete(+req.params.id);
    });
  }

  private async __decryptPassword(inputFromRequest: string, passwordFromUserBDD: string):Promise<boolean> {
    return await bcrypt.compare(inputFromRequest, passwordFromUserBDD);
  }
}