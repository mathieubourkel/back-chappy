import { NextFunction, Response, Request } from "express";
import { TaskEntity } from "../entities/task.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import {
  cleanResDataTask,
  cleanResDataTaskCalendar,
  cleanResDataTaskForDel,
} from "../dto/task.dto";
import { redis } from "..";
import { CustomError } from "../middlewares/error.handler.middleware";
import { CacheEnum } from "../enums/cache.enum";

export class TaskController extends GlobalController {

  private taskService = new Service(TaskEntity);

  async getTasksByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: { id: +req.params.idProject } };
    await this.handleGlobal(req, res, next, async () => {
      const result:Array<TaskEntity> = await this.proceedCache<Array<TaskEntity>>(CacheEnum.TASKS, async () => await this.taskService.getManyBySearchOptions(searchOptions, ["project","category","users","step", "project.owner", "project.users"],cleanResDataTaskCalendar), {params: req.params.idProject});
      if (!result) throw new CustomError("TC-NO-EXIST", 404)
      if (result.length === 0) return result;
      if (result[0].project.owner.id !== req.user.userId && !result[0].project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("TC-NO-RIGHTS", 403);
      return result;
    });
  }

  async getOwnerTasksByIdUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: {owner: { id: +req.user.userId } }};
    await this.handleGlobal(req, res, next, async () => {
      return await this.taskService.getManyBySearchOptions(searchOptions, ["project", "project.owner"], {project: {id: true, owner: {id: true}}});
    });
  }

  async getCollabTasksByIdUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { users: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      return await this.taskService.getManyBySearchOptions(searchOptions, ["users"], {users: {id: true}});
    });
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:TaskEntity = await this.proceedCache<TaskEntity>(CacheEnum.TASK, async () => await this.taskService.getOneById(+req.params.id, ["category", "owner", "users", "project", "project.users"],cleanResDataTask), {params: req.params.id});
      if (result.owner.id !== req.user.userId && !result.project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("TC-NO-RIGHTS", 403);
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const data = this.__buildRequestForCreation(req.body, req.user.userId)
      this.delCache(CacheEnum.STEP, {params: req.body.step})
      this.delCache(CacheEnum.PROJECT_TASKS, {params: req.body.project})
      return await this.taskService.create(data);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result = await this.taskService.update(+req.params.id, req.body, ["owner", "users", "category", "step"], cleanResDataTask);
      this.delCache(CacheEnum.TASK, {params: result.id})
      this.delCache(CacheEnum.STEP, {params: result.step.id})
      this.delCache(CacheEnum.PROJECT_TASKS, {params: result.project.id})
      return result;
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:TaskEntity = await this.taskService.getOneById<TaskEntity>(+req.params.id,["owner", "project", "project.owner", "step"],cleanResDataTaskForDel);
      if (result.owner.id !== req.user.userId && result.project.owner.id !== req.user.userId) throw new CustomError("TC-NO-RIGHTS", 403);
      this.delCache(CacheEnum.TASK, {params: result.id})
      this.delCache(CacheEnum.STEP, {params: result.step.id})
      this.delCache(CacheEnum.PROJECT_TASKS, {params: result.project.id})
      return await this.taskService.delete(result.id);
    });
  }

  private __buildRequestForCreation(body, userId:number){
    body.users = body.users.map((elem: number) => {
      return { id: elem };
    });
    body.owner = userId;
    return body
  }
}


