import { NextFunction, Response } from "express";
import { Category } from "../entities/category.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { RequestWithUserInfo } from "../interfaces/request.interface";

export class CategoryController extends GlobalController {

  private categoryService = new Service(Category)


  async getAll(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.categoryService.getAll();
    });
  }

  async create(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.categoryService.create(req.body);
    });
  }

  async delete(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.categoryService.delete(+req.params.id);
    });
  }
}