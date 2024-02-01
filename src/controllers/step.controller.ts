import { NextFunction, Response, Request } from "express";
import { StepEntity } from "../entities/step.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { cleanResDataStep, cleanResDataStepForCheck } from "../dto/step.dto";
import { CustomError } from "../middlewares/error.handler.middleware";
import { CacheEnum } from "../enums/cache.enum";

export class StepController extends GlobalController {

  private stepService = new Service(StepEntity)

  async getStepById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:StepEntity = await this.proceedCache<StepEntity>(CacheEnum.STEP, async () => await this.stepService.getOneById(+req.params.id, ["tasks", "project", "project.owner", "project.users"], cleanResDataStep), {params: req.params.id});
      if (!result) throw new CustomError("SC-NO-EXIST", 404)
      if (result.project.owner.id !== req.user.userId) throw new CustomError("SC-NO-RIGHTS", 403);
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      this.delCache(CacheEnum.STEPS, {params: req.body.project})
      this.delCache(CacheEnum.PROJECT, {params: req.body.project})
      return await this.stepService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result = await this.stepService.update(+req.params.id, req.body, ["project", "project.owner"], cleanResDataStep);
      this.delCache(CacheEnum.STEP, {params: result.id})
      this.delCache(CacheEnum.PROJECT, {params: result.project.id})
      return result
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:StepEntity = await this.stepService.getOneById<StepEntity>(+req.params.id, ["project", "project.owner"], cleanResDataStepForCheck);
      if (result.project.owner.id !== req.user.userId) throw new CustomError("SC-NO-RIGHTS", 403);
      this.delCache(CacheEnum.STEP, {params: result.id})
      this.delCache(CacheEnum.PROJECT, {params: result.project.id})
      return await this.stepService.delete(+req.params.id);
    });
  }
}