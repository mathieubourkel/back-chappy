import { NextFunction, Request, Response } from "express";
import { Step } from "../entities/step.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class StepController extends GlobalController {

  private stepService = new Service(Step)

}