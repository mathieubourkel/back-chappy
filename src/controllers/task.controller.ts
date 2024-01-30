import { NextFunction, Response, Request } from "express";
import { TaskEntity } from "../entities/task.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import {
  cleanResDataTask,
  cleanResDataTaskCalendar,
  cleanResDataTaskForDel,
} from "../dto/task.dto";
import { CustomError } from "../utils/CustomError";
import { redis } from "..";

export class TaskController extends GlobalController {

  private taskService = new Service(TaskEntity);

  async getTasksByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: { id: +req.params.idProject } };
    await this.handleGlobal(req, res, next, async () => {
      let cacheResult:any = await redis.get(`tasksByProject/${req.params.idProject}`);
      if (cacheResult && cacheResult !== null) {
        cacheResult = JSON.parse(cacheResult)
        if (cacheResult.length === 0) return cacheResult
        if (cacheResult[0].project.owner.id !== req.user.userId && !cacheResult[0].project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("TC-NO-RIGHTS", 403);
        console.log(new Date(), "coucou ca vient du cache");
        return cacheResult
      }
      const result:any = await this.taskService.getManyBySearchOptions(searchOptions, ["project","category","users","step", "project.owner", "project.users"],
      cleanResDataTaskCalendar);
      if (result.length > 0){
        if (result[0].project.owner.id !== req.user.userId && !result[0].project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("TC-NO-RIGHTS", 403);
      }
      await redis.set(`tasksByProject/${req.params.idProject}`, JSON.stringify(result));
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
      let cacheResult: any = await redis.get(`task/${req.params.id}`);
      if (cacheResult && cacheResult !== null) {
        cacheResult = JSON.parse(cacheResult);
        if (
          cacheResult.owner.id !== req.user.userId &&
          !cacheResult.project.users.find((user: { id: number }) => user.id === req.user.userId))
          throw new CustomError("TC-NO-RIGHTS", 403);
        return cacheResult;
      }
      const result:any = await this.taskService.getOneById(+req.params.id, ["category", "owner", "users", "project", "project.users"],cleanResDataTask);
      redis.set(`task/${result.id}`, JSON.stringify(result));
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      req.body.category = req.body.category.id;
      req.body.owner = req.user.userId;
      req.body.users = req.body.users.map((elem: number) => {
        return { id: elem };
      });
      const result: any = await this.taskService.create(req.body);
      redis.del(`task/${result.id}`);
      redis.del(`step/${req.body.step}`);
      redis.del(`tasksByProject/${req.body.project}`);
      return result;
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result = await this.taskService.update(+req.params.id, req.body, ["owner", "users", "category", "step"], cleanResDataTask
      );
      if (result.owner.id !== req.user.userId)
        throw new CustomError("TC-NO-RIGHTS", 403);
      redis.del(`task/${result.id}`);
      redis.del(`step/${result.step.id}`);
      redis.del(`tasksByProject/${result.project.id}`);
      return result;
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result: any = await this.taskService.getOneById(+req.params.id,
        ["owner", "project", "project.owner", "step"],cleanResDataTaskForDel);
      if (result.owner.id !== req.user.userId && result.project.owner.id !== req.user.userId) 
      throw new CustomError("TC-NO-RIGHTS", 403);
      redis.del(`task/${result.id}`);
      redis.del(`step/${result.step.id}`);
      redis.del(`tasksByProject/${result.project.id}`);
      return await this.taskService.delete(result.id);
    });
  }
}
