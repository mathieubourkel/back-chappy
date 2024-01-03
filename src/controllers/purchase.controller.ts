import { NextFunction, Request, Response } from "express";
import { Purchase } from "../entities/purchase.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class PurchaseController extends GlobalController {

  private purchaseService = new Service(Purchase)

}