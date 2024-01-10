import { NextFunction, Response } from "express";
import { Step } from "../entities/step.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { RequestWithUserInfo } from "../interfaces/request.interface";

export class StepController extends GlobalController {

  private stepService = new Service(Step)


  async getStepsByIdProject(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    const searchOptions = { project: {id: +req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.getManyBySearchOptions(searchOptions);
    });
  }

  async getStepByIdStep(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.getOneById(+req.params.idStep, ["tasks", "project"]);
    });
  }

  async create(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.create(req.body);
    });
  }

  async update(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.update(+req.params.id, req.body);
    });
  }

  async delete(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.stepService.delete(+req.params.id);
    });
  }
}