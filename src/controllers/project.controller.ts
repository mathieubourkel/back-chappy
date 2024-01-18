import { NextFunction, Response, Request } from "express";
import { Project } from "../entities/project.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { User } from "../entities/user.entity";
import { CreateProjectDto, ModifyProjectDto } from "../dto/project.dto";
import { validate } from "class-validator";
import { CustomError } from "../utils/CustomError";
import { redis } from "..";

export class ProjectController extends GlobalController {
  private projectService = new Service(Project);
  private userService = new Service(User);

  async getProjectsFromOwner(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { owner: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      let cacheResult = await redis.get(`myprojects${req.user.userId}`);
      if (cacheResult && cacheResult !== null) {
        console.log(new Date(), "coucou ca vient du cache")
        return JSON.parse(cacheResult);
      }
      const result = await this.projectService.getManyBySearchOptions(searchOptions, [
        "steps",
      ]);
      await redis.set(`myprojects${req.user.userId}`, JSON.stringify(result));
      return result
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
      let cacheResult = await redis.get(`project${req.params.idProject}`);
      if (cacheResult && cacheResult !== null) {
        console.log(new Date(), "coucou ca vient du cache")
        return JSON.parse(cacheResult);
      }
      const result:any = await this.projectService.getOneById(+req.params.id, ["users", "owner"], {description: true, id:true, owner: {id:true}, users: {id: true}});
      console.log(req.user.userId)
      console.log(result)
      console.log(result.owner.id)
      console.log(result.owner)
      if (result.owner.id !== req.user.userId && !result.users.includes(req.user.userId)) throw new CustomError("PC-NOMEMBER", 400)
      redis.set(`project${result.id}`, JSON.stringify(result))
      return result;
    });
  }

  async getProjectNameById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.getOneById(+req.params.id, [], { name: true });
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const projectDto: any = new CreateProjectDto(req.body);
      const errors = await validate(projectDto, { whitelist: true });
      if (errors.length > 0) {
        throw new CustomError("PC-DTO-CHECK", 400);
      }
      projectDto.users = projectDto.users.map((elem: number) => {
        return { id: elem };
      });
      projectDto.owner = req.user.userId;
      const result:any = await this.projectService.create(projectDto);
      redis.del(`myprojects${req.user.userId}`)
      redis.set(`project${result.id}`, JSON.stringify(result))
      return result
      //redis.del(`projet${result.id}`)
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

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const userDto: any = new ModifyProjectDto(req.body);
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
