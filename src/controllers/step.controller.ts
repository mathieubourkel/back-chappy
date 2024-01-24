import { NextFunction, Response, Request } from "express";
import { Step } from "../entities/step.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CustomError } from "../utils/CustomError";
import { redis } from "..";
import { validate } from "class-validator";
import { CreateStepDto, StepDto, cleanResDataStep, cleanResDataStepForCheck } from "../dto/step.dto";

export class StepController extends GlobalController {

  private stepService = new Service(Step)

  async getStepById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      let cacheResult:any = await redis.get(`step/${req.params.id}`);
      if (cacheResult && cacheResult !== null) {
        cacheResult = JSON.parse(cacheResult)
        if (cacheResult.project.owner.id !== req.user.userId) throw new CustomError("SC-NO-RIGHTS", 403);
        console.log(new Date(), "coucou ca vient du cache", `step/${req.params.id}`);
        return cacheResult;
      }
      const result:any = await this.stepService.getOneById(+req.params.id, ["tasks", "project", "project.owner", "project.users"], cleanResDataStep);
      if (result.project.owner.id !== req.user.userId) throw new CustomError("SC-NO-RIGHTS", 403);
      redis.set(`step/${result.id}`, JSON.stringify(result));
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const stepDto: any = new CreateStepDto(req.body);
      const errors = await validate(stepDto, { whitelist: true });
      if (errors.length > 0) {
        throw new CustomError("SC-DTO-CHECK", 400);
      }  
      const result = await this.stepService.create(stepDto);
      redis.del(`project/${stepDto.project}`);
      return result;
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const stepDto: any = new StepDto(req.body);
      const errors = await validate(stepDto, { whitelist: true });
      if (errors.length > 0) {
        throw new CustomError("SC-DTO-CHECK", 400);
      }
      const result = await this.stepService.update(+req.params.id, stepDto, ["project", "project.owner"], cleanResDataStep);
      if (result.project.owner.id !== req.user.userId) throw new CustomError("SC-NO-RIGHTS", 403);
      redis.del(`project/${result.project.id}`);
      redis.del(`step/${result.id}`);
      return result
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:any = await this.stepService.getOneById(+req.params.id, ["project", "project.owner"], cleanResDataStepForCheck);
      if (result.project.owner.id !== req.user.userId) throw new CustomError("SC-NO-RIGHTS", 403);
      redis.del(`project/${result.project.id}`);
      redis.del(`step/${result.id}`);  
      return await this.stepService.delete(+req.params.id);
    });
  }
}