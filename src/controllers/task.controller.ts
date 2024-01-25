import { NextFunction, Response, Request } from "express";
import { Task } from "../entities/task.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CreateTaskDto, cleanResDataTask } from "../dto/task.dto";
import { CustomError } from "../utils/CustomError";
import { redis } from "..";
import { validate } from "class-validator";

export class TaskController extends GlobalController {

  private taskService = new Service(Task)

  async getTasksByIdStep(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { step: {id:+req.params.idStep} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "step",
        "category",
        "users"
      ]);
    });
  }

  async getTasksByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: {id:+req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "project",
        "category",
        "users"
      ]);
    });
  }

  async getOwnerTasksByIdUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { owner: {id: +req.params.idUser} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "owner"
      ]);
    });
  }

  async getCollabTasksByIdUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { users: {id: +req.params.idUser} };
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getManyBySearchOptions(searchOptions, [
        "users"
      ]);
    });
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.getOneById(+req.params.id, ["category", "owner", "users"], cleanResDataTask);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      req.body.category = req.body.category.id
      const taskDto: any = new CreateTaskDto(req.body);
      const errors = await validate(taskDto, { whitelist: true });
      if (errors.length > 0) {
        throw new CustomError("TC-DTO-CHECK", 400);
      }
      taskDto.owner = req.user.userId
      taskDto.users = taskDto.users.map((elem: number) => {
        return { id: elem };
      });
      const result:any = await this.taskService.create(taskDto);
      redis.del(`task/${result.id}`);
      redis.del(`step/${taskDto.step}`);
      return result;
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.taskService.delete(+req.params.id);
    });
  }
}