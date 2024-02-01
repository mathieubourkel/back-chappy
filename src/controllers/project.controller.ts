import { NextFunction, Response, Request } from "express";
import { ProjectEntity } from "../entities/project.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import {
  lightDataUsersOnProject,
  dataUsersOnProject,
  fullDataProject, dataProject,
} from "../dto/project.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../middlewares/error.handler.middleware";
import { CacheEnum } from "../enums/cache.enum";

export class ProjectController extends GlobalController {

  private projectService = new Service(ProjectEntity);
  private userService = new Service(UserEntity);

  async getProjectsFromOwner(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { owner: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      return await this.proceedCache<Array<ProjectEntity>>(CacheEnum.PROJECTS, async () => await this.projectService.getManyBySearchOptions<Array<ProjectEntity>>(searchOptions, ["steps"]), {params: req.user.userId});
    });
  }

  async getProjectsFromMember(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { users: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      return await this.projectService.getManyBySearchOptions<Array<ProjectEntity>>(searchOptions, ["steps","owner"]);
    });
  }

  async getMembersByProject(req:Request, res:Response, next:NextFunction): Promise<void> {
    await this.handleGlobal(req, res, next, async (): Promise<unknown> => {
      const result:ProjectEntity = await this.proceedCache<ProjectEntity>(CacheEnum.PROJECT_MEMBERS, async () => await this.projectService.getOneById(+req.params.idProject, ["users", "owner", "users.myOwnTasks", "users.company"], dataUsersOnProject), {params: req.params.idProject});
      if (!result) throw new CustomError("PC-NO-EXIST", 404)
      if (result.owner.id !== req.user.userId && !result.users.find((user: { id: number }) : boolean => user.id === req.user.userId)) throw new CustomError("PC-NO-RIGHTS", 403);
      return result;
    })
  }

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:ProjectEntity = await this.proceedCache<ProjectEntity>(CacheEnum.PROJECT, async () => await this.projectService.getOneById(+req.params.id, ["users", "owner", "steps", "documents", "purchases"], fullDataProject),{params: req.params.id});
      if (!result) throw new CustomError("PC-NO-EXIST", 404)
      if (result.owner.id !== req.user.userId && !result.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("PC-NO-RIGHTS", 403);
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      this.delCache(CacheEnum.PROJECTS, {params: req.user.userId})
      const data:ProjectEntity = await this.__buildRequestForCreation(req.body, +req.user.userId)
      return await this.projectService.create(data);
    });
  }

  async addUserToProject(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const project:ProjectEntity = await this.projectService.getOneById<ProjectEntity>(+req.body.idProject,["users"], lightDataUsersOnProject);
      if (!project) throw new CustomError("PC-JOIN-NOTFIND", 400);
      const user:UserEntity = await this.userService.getOneById(req.body.idUser);
      project.users.push(user);
      return await this.projectService.update(project.id, project);
    });
  }

  async delUserToProject(req: Request, res: Response, next: NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async () => {
      const project:ProjectEntity = await this.projectService.getOneById<ProjectEntity>(+req.body.idProject,["users", "owner"], lightDataUsersOnProject);
      if (!project) throw new CustomError("PC-DEL-NOTFIND", 400);
      if(project.owner.id !== req.user.userId) throw new CustomError("PC-DEL-NOTAUTHORIZED", 403);
      const user:UserEntity = await this.userService.getOneById(+req.body.idUser);
      const userIndex = project.users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        project.users = project.users.filter(u => u.id !== user.id);
      }
      return await this.projectService.update(project.id, project);
    });
  }

  async joinProjectByCode(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const project:ProjectEntity = await this.projectService.getOneBySearchOptions<ProjectEntity>({ code: req.body.code },["users"]);
      if (!project) throw new CustomError("PC-JOIN-NOTFIND", 400);
      const user:UserEntity = await this.userService.getOneById<UserEntity>(req.user.userId);
      project.users.push(user);
      this.delCache(CacheEnum.PROJECT, {params: project.id})
      return await this.projectService.update(project.id, project);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result = await this.projectService.update(+req.params.id, req.body, ["owner"], dataProject);
      this.delCache(CacheEnum.PROJECT, {params: result.id})
      return result;
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:ProjectEntity = await this.projectService.getOneById<ProjectEntity>(+req.params.id, ["owner"], lightDataUsersOnProject);
      if (result.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403);  
      this.delCache(CacheEnum.PROJECT, {params: result.id})
      this.delCache(CacheEnum.PROJECTS, {params: req.user.userId})
      return await this.projectService.delete(result.id);
    });
  }

  private __buildRequestForCreation(body, userId:number){
      body.code = this.__generateInvitationCode();
      body.users = body.users.map((elem: number) => {
        return { id: elem };
      });
      body.owner = userId;
      return body
  }

  private __generateInvitationCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 16; i++) {
      const randomCode = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomCode);
    }
    return code;
  }
}
