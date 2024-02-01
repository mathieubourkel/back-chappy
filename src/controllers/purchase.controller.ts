import { NextFunction, Response, Request } from "express";
import { PurchaseEntity } from "../entities/purchase.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { cleanResDataPurchaseForDel, cleanResDataPurchases } from "../dto/purchase.dto";
import { CustomError } from "../middlewares/error.handler.middleware";
import { CacheEnum } from "../enums/cache.enum";

export class PurchaseController extends GlobalController {

  private purchaseService = new Service(PurchaseEntity)

  async getPurchasesByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: { id: +req.params.idProject } };
    await this.handleGlobal(req, res, next, async () => {
      const result:Array<PurchaseEntity> = await this.proceedCache<Array<PurchaseEntity>>(CacheEnum.PURCHASES, async () => await this.purchaseService.getManyBySearchOptions(searchOptions, ["project","project.owner", "project.users"],cleanResDataPurchases), {params: req.params.idProject});
      if (!result) throw new CustomError("PC-NO-EXIST", 404)
      if (result.length === 0) return result
      if (result[0].project.owner.id !== req.user.userId && !result[0].project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("PurcC-NO-RIGHTS", 403);
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      this.delCache(CacheEnum.PURCHASES, {params: req.body.project})
      return await this.purchaseService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result = await this.purchaseService.update(+req.params.id, req.body, ["project"], cleanResDataPurchases);
      this.delCache(CacheEnum.PURCHASES, {params: result.project.id})
      this.delCache(CacheEnum.PURCHASE, {params: result.id})
      return result;
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:PurchaseEntity = await this.purchaseService.getOneById<PurchaseEntity>(+req.params.id, ["project", "project.owner"], cleanResDataPurchaseForDel);
      if (result.project.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403);  
      this.delCache(CacheEnum.PURCHASES, {params: result.project.id})
      this.delCache(CacheEnum.PURCHASE, {params: result.id})
      return await this.purchaseService.delete(result.id);
    });
  }
}