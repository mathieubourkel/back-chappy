import { NextFunction, Request, Response } from "express";
import { Company } from "../entities/company.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class CompanyController extends GlobalController {

  private companyService = new Service(Company)

}