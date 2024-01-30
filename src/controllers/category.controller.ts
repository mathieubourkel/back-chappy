import { NextFunction, Response, Request } from "express";
import { CategoryEntity } from "../entities/category.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { redis } from "..";
import { CustomError } from "../middlewares/error.handler.middleware";

export class CategoryController extends GlobalController {

  private categoryService = new Service(CategoryEntity)

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal<Array<CategoryEntity>>(req, res, next, async () => {
      let cacheResult:string = await redis.get(`categories`);
      if (cacheResult && cacheResult !== null) {
        return JSON.parse(cacheResult) as Array<CategoryEntity>
      }
      const result = await this.categoryService.getAll<Array<CategoryEntity>>();
      redis.set(`categories`, JSON.stringify(result));
      return result
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
  //    if (req.user.userId != 1) throw new CustomError("CC-NORIGHT", 403)
  // A remplace par check le role si addmin
      redis.del(`categories`)
      return this.categoryService.create(req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      if (req.user.userId != 1) throw new CustomError("CC-NORIGHT", 403)
      redis.del(`categories`)
      return this.categoryService.delete(+req.params.id);
    });
  }
}