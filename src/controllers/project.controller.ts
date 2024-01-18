import { NextFunction, Response, Request } from "express";
import { Project } from "../entities/project.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { User } from "../entities/user.entity";
import { CreateProjectDto, ProjectDto, cleanResDataProject } from "../dto/project.dto";
import { validate } from "class-validator";
import { CustomError } from "../utils/CustomError";
import { redis } from "..";

export class ProjectController extends GlobalController {
  private projectService = new Service(Project);
  private userService = new Service(User);
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
      let cacheResult = await redis.get(`mytoto${req.user.userId}`);
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
      return this.projectService.getManyBySearchOptions(searchOptions, [
        "steps",
        "owner",
      ]);
    });
  }

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      let cacheResult = await redis.get(`project${req.params.id}`);
      if (cacheResult && cacheResult !== null) {
        console.log(new Date(), "coucou ca vient du cache");
        return JSON.parse(cacheResult);
      }
      const result: any = await this.projectService.getOneById(+req.params.id, ["users", "owner"], cleanResDataProject);
      if (result.owner.id !== req.user.userId && !result.users.includes(req.user.userId)) throw new CustomError("PC-NO-ACCESS", 400);
      redis.set(`project${result.id}`, JSON.stringify(result));
      return result;
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const projectDto: any = new CreateProjectDto(req.body);
      const errors = await validate(projectDto, { whitelist: true });
      if (errors.length > 0) {
        throw new CustomError("PC-DTO-CHECK", 400);
      }
      projectDto.code = this.__generateInvitationCode();
      projectDto.users = projectDto.users.map((elem: number) => {
        return { id: elem };
      });
      projectDto.owner = req.user.userId;
      redis.del(`myprojects${req.user.userId}`);
      return await this.projectService.create(projectDto);
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
      return this.projectService.update(+req.params.idProject, project);
    });
  }

  async joinProjectByCode(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const project: any = await this.projectService.getOneBySearchOptions(
        { code: req.body.code },
        ["users"]
      );
      // const project : any = req.body;

      const user: any = await this.userService.getOneById(req.user.userId);
      console.log(project, user.firstname, req.body);
      if (!project) throw new CustomError("PROJECT DOES NOT EXISTS", 200);
      project.users.push(user);
      return this.projectService.update(project.id, project);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const userDto: any = new ProjectDto(req.body);
      const errors = await validate(userDto, { whitelist: true });
      if (errors.length > 0) {
        throw new CustomError("PC-DTO-CHECK", 400);
      }
      console.log("update", req.body);
      return this.projectService.update(+req.params.id, userDto);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.delete(+req.params.id);
    });
  }
}
