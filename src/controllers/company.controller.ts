import { NextFunction, Request, Response } from "express";
import { Company } from "../entities/company.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";
import { CreateCompanyDto } from "../dto/company.dto";
import { validate } from "class-validator";

export class CompanyController extends GlobalController {

  private companyService = new Service(Company)

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.companyService.getAll();
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const companyDto = new CreateCompanyDto(req.body)
      const errors = await validate(companyDto)
      if (errors.length > 0) {
        throw new CustomError("PC-DTO-CHECK-COMPANY")
      }
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