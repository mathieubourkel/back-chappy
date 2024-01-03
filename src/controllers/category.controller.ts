import { NextFunction, Request, Response } from "express";
import { Category } from "../entities/category.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class CategoryController extends GlobalController {

  private categoryService = new Service(Category)

}