import { NextFunction, Response, Request } from "express";
import { ProjectEntity } from "../entities/project.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
<<<<<<< HEAD
import { User } from "../entities/user.entity";
import {
  CreateProjectDto,
  ProjectDto,
  cleanResDataProject,
  cleanResDataProjectForDel,
  FullResDataProject,
  cleanResDataUsersOnProject
} from "../dto/project.dto";
import { validate } from "class-validator";
=======
import { UserEntity } from "../entities/user.entity";
import { cleanResDataProject, cleanResDataProjectForDel,FullResDataProject } from "../dto/project.dto";
>>>>>>> 110331e7d58fd4af426b4e544cfa965a1e0ea432
import { CustomError } from "../utils/CustomError";
import { redis } from "..";

export class ProjectController extends GlobalController {
  private projectService = new Service(ProjectEntity);
  private userService = new Service(UserEntity);

  private __generateInvitationCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 16; i++) {
      const randomCode = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomCode);
    }
    return code;
  }

  async getProjectsFromOwner(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { owner: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      let cacheResult = await redis.get(`myprojects/${req.user.userId}`);
      if (cacheResult && cacheResult !== null) {
        console.log(new Date(), "coucou ca vient du cache");
        return JSON.parse(cacheResult);
      }
      const result = await this.projectService.getManyBySearchOptions(
        searchOptions,
        ["steps"]
      );
      await redis.set(`myprojects${req.user.userId}`, JSON.stringify(result));
      return result;
    });
  }

  async getProjectsFromMember(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { users: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      return await this.projectService.getManyBySearchOptions(searchOptions, [
        "steps",
        "owner",
      ]);
    });
  }

  async getMembersByProject(req:Request, res:Response, next:NextFunction): Promise<void> {
    await this.handleGlobal(req, res, next, async (): Promise<unknown> => {
      // let cacheResult:any = await redis.get(`project/${req.params.id}`);
      // if(cacheResult) {
      //   cacheResult = JSON.parse(cacheResult)
      //   if (cacheResult.owner.id !== req.user.userId && !cacheResult.users.find((user: { id: number }): boolean => user.id === req.user.userId)) throw new CustomError("PC-NO-RIGHTS", 403);
      //   return cacheResult;
      // }
      console.log("MAIS TES OU ??")
      const result:any = await this.projectService.getOneById(+req.params.idProject, ["users", "owner", "users.myOwnTasks", "users.company"], cleanResDataUsersOnProject);
      if (result.owner.id !== req.user.userId && !result.users.find((user: { id: number }) : boolean => user.id === req.user.userId)) throw new CustomError("PC-NO-RIGHTS", 403);
      // await redis.set(
      //     `project/${result.id}`,
      //     JSON.stringify(result)
      // );
      console.log(result, "toto")
      return result;
    })
  }

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      let cacheResult:any = await redis.get(`project/${req.params.id}`);
      if (cacheResult && cacheResult !== null) {
        cacheResult = JSON.parse(cacheResult)
        if (cacheResult.owner.id !== req.user.userId && !cacheResult.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("PC-NO-RIGHTS", 403);
        console.log(new Date(), "coucou ca vient du cache", `project/${req.params.id}`);
        return cacheResult;
      }
      const result: any = await this.projectService.getOneById(+req.params.id, ["users", "owner", "steps", "documents", "purchases"], FullResDataProject);
      if (result.owner.id !== req.user.userId && !result.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("PC-NO-RIGHTS", 403);
      redis.set(`project/${result.id}`, JSON.stringify(result));
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      req.body.code = this.__generateInvitationCode();
      req.body.users = req.body.users.map((elem: number) => {
        return { id: elem };
      });
      req.body.owner = req.user.userId;
      redis.del(`myprojects${req.user.userId}`);
      return await this.projectService.create(req.body);
    });
  }

  async addUserToProject(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const project: any = await this.projectService.getOneById(
        +req.params.idProject,
        ["users"]
      );
      const user: any = await this.userService.getOneById(req.body.idUser);
      project.users.push(user);
      return await this.projectService.update(+req.params.idProject, project);
    });
  }

  async joinProjectByCode(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const project: any = await this.projectService.getOneBySearchOptions(
        { code: req.body.code },
        ["users"]
      );
      if (!project) throw new CustomError("PC-JOIN-NOTFIND", 400);
      const user: any = await this.userService.getOneById(req.user.userId); 
      project.users.push(user);
      return await this.projectService.update(project.id, project);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result = await this.projectService.update(+req.params.id, req.body, ["owner"], cleanResDataProject);
      if (result.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403);
      redis.del(`project/${result.id}`);
      return result;
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:any = await this.projectService.getOneById(+req.params.id, ["owner"], cleanResDataProjectForDel);
      if (result.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403);  
      redis.del(`project/${result.id}`); 
      redis.del(`myprojects/${req.user.userId}`);
      return await this.projectService.delete(result.id);
    });
  }
}
