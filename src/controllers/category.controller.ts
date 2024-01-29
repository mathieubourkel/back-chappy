import { NextFunction, Response, Request } from "express";
import { Category } from "../entities/category.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CustomError } from "../utils/CustomError";
import { redis } from "..";

export class CategoryController extends GlobalController {

  private categoryService = new Service(Category)

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal<Array<Category>>(req, res, next, async () => {
      let cacheResult:string = await redis.get(`categories`);
      if (cacheResult && cacheResult !== null) {
        return JSON.parse(cacheResult) as Array<Category>
      }
      const result = await this.categoryService.getAll<Array<Category>>();
      redis.set(`categories`, JSON.stringify(result));
      return result
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      if (req.user.userId != 1) throw new CustomError("CC-NORIGHT", 403)
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