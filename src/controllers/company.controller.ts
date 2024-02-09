import { NextFunction, Request, Response } from "express";
import { CompanyEntity, resDataCompanyClean } from "../entities/company.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CacheEnum } from "../enums/cache.enum";
import { CustomError } from "../middlewares/error.handler.middleware";
import { UserEntity } from "../entities/user.entity";

export class CompanyController extends GlobalController {

  private companyService = new Service(CompanyEntity)
  private userService = new Service(UserEntity)

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return await this.proceedCache<Array<CompanyEntity>>(CacheEnum.COMPANIES, async () => await this.companyService.getAll<Array<CompanyEntity>>());
    });
  }

  async createWhenLogged(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user:UserEntity = await this.userService.getOneById(req.user.userId, ["myCompany"], {id: true, company: true})
      if (!user) throw new CustomError("CC-USERNOTFIND", 400)
      if (user.myCompany) throw new CustomError("CC-ALREADY-OWNER", 400)
      this.delCache(CacheEnum.COMPANIES)
      req.body.owner = req.user.userId
      return await this.companyService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.companyService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:CompanyEntity = await this.companyService.getOneById<CompanyEntity>(+req.params.id, ["owner"], resDataCompanyClean);
      if (!result) throw new CustomError("CC-COMPANYT-NOTFIND", 400);
      if (result.owner.id !== req.user.userId) throw new CustomError("CC-NO-RIGHTS", 403);
      this.delCache(CacheEnum.COMPANIES)
      return this.companyService.delete(result.id);
    });
  }
    
}