import { NextFunction, Response, Request } from "express";
import { CategoryEntity } from "../entities/category.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CustomError } from "../middlewares/error.handler.middleware";
import { CacheEnum } from "../enums/cache.enum";

export class CategoryController extends GlobalController {

  private categoryService = new Service(CategoryEntity);

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return await this.proceedCache<Array<CategoryEntity>>(CacheEnum.CATEGORIES, async () => await this.categoryService.getAll<Array<CategoryEntity>>());
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      if (req.user.userId != 1) throw new CustomError("CC-NORIGHT", 403);
      this.delCache(CacheEnum.CATEGORIES)
      return await this.categoryService.create(req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      if (req.user.userId != 1) throw new CustomError("CC-NORIGHT", 403);
      this.delCache(CacheEnum.CATEGORIES)
      return await this.categoryService.delete(+req.params.id);
    });
  }
}
