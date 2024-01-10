import { NextFunction, Response } from "express";
import { Purchase } from "../entities/purchase.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { RequestWithUserInfo } from "../interfaces/request.interface";

export class PurchaseController extends GlobalController {

  private purchaseService = new Service(Purchase)

  async getPurchasesByIdProject(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    const searchOptions = { project: {id:+req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.getManyBySearchOptions(searchOptions, [
        "project"
      ]);
    });
  }

  async create(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.create(req.body);
    });
  }

  async update(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.update(+req.params.id, req.body);
    });
  }

  async delete(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.purchaseService.delete(+req.params.id);
    });
  }
}