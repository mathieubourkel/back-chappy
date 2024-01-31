import { NextFunction, Response, Request } from "express";
import { PurchaseEntity } from "../entities/purchase.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { redis } from "..";
import { cleanResDataPurchaseForDel, cleanResDataPurchases } from "../dto/purchase.dto";
import { CustomError } from "../middlewares/error.handler.middleware";

export class PurchaseController extends GlobalController {

  private purchaseService = new Service(PurchaseEntity)

  async getPurchasesByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: { id: +req.params.idProject } };
    await this.handleGlobal(req, res, next, async () => {
      let cacheResult:any = await redis.get(`purchasesByProject/${req.params.idProject}`);
      if (cacheResult && cacheResult !== null) {
        cacheResult = JSON.parse(cacheResult)
        if (cacheResult.length === 0) return cacheResult
        if (cacheResult[0].project.owner.id !== req.user.userId && !cacheResult[0].project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("PurC-NO-RIGHTS", 403);
        console.log(new Date(), "coucou ca vient du cache");
        return cacheResult
      }
      const result:any = await this.purchaseService.getManyBySearchOptions(searchOptions, ["project","project.owner", "project.users"],
      cleanResDataPurchases);
      if (result.length > 0){
        if (result[0].project.owner.id !== req.user.userId && !result[0].project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("PurcC-NO-RIGHTS", 403);
      }
      await redis.set(`purchasesByProject/${req.params.idProject}`, JSON.stringify(result));
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      redis.del(`purchasesByProject/${req.body.project}`)
      return await this.purchaseService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return await this.purchaseService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:any = await this.purchaseService.getOneById(+req.params.id, ["project", "project.owner"], cleanResDataPurchaseForDel);
      if (result.project.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403);  
      redis.del(`purchasesByProject/${result.project.id}`)
      return await this.purchaseService.delete(+req.params.id);
    });
  }
}