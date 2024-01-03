import { NextFunction, Request, Response } from "express";
import { Step } from "../entities/step.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class StepController extends GlobalController {

  private stepService = new Service(Step)


  async getStepByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: {id: +req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.getManyBySearchOptions(searchOptions);
    });
  }

  async getStepByIdStep(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.getOneById(+req.params.id, ["tasks", "project"]);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.delete(+req.params.id);
    });
  }
}