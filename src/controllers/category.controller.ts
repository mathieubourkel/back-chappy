import { NextFunction, Request, Response } from "express";
import { Category } from "../entities/category.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class CategoryController extends GlobalController {

  private categoryService = new Service(Category)


  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.categoryService.getAll();
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.categoryService.create(req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.categoryService.delete(+req.params.id);
    });
  }
}