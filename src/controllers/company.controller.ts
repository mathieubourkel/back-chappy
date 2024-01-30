import { NextFunction, Request, Response } from "express";
import { CompanyEntity } from "../entities/company.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CreateCompanyDto } from "../dto/company.dto";
import { validate } from "class-validator";
import { CustomError } from "../middlewares/error.handler.middleware";

export class CompanyController extends GlobalController {

  private companyService = new Service(CompanyEntity)

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.companyService.getAll();
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.companyService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.companyService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.companyService.delete(+req.params.id);
    });
  }
    
}