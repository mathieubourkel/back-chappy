import { NextFunction, Response, Request } from "express";
import { Project } from "../entities/project.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { User } from "../entities/user.entity";
import { CreateProjectDto, ModifyProjectDto } from "../dto/project.dto";
import { validate } from "class-validator";
import { CustomError } from "../utils/CustomError";



export class ProjectController extends GlobalController {
  private projectService = new Service(Project);
  private userService = new Service(User);
  private __generateInvitationCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";
    for (let i = 0; i < 16 ; i++) {
      const randomCode = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomCode)
    }

    return code;
  }

  async getProjectsFromOwner(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { owner: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.getManyBySearchOptions(searchOptions, [
        "steps",
      ]);
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
      return this.projectService.getOneById(+req.params.id, ["steps", "owner"]);
    });
  }

  async getProjectNameById(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.getOneById(+req.params.id, [], { name: true });
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const userDto:any = new CreateProjectDto(req.body);
      const errors = await validate(userDto, {whitelist: true});
      if (errors.length > 0) {
        throw new CustomError("PC-DTO-CHECK", 400);
      }

      userDto.code = this.__generateInvitationCode();

      userDto.users = userDto.users.map((elem: number) => {
        return { id: elem };
      });
      return this.projectService.create(userDto);
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

  async jointProjectByCode(req: Request, res: Response, next: NextFunction){
    
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const userDto:any = new ModifyProjectDto(req.body);
      const errors = await validate(userDto, {whitelist: true});
      console.log(errors)
      console.log(userDto)
      if (errors.length > 0) {
        throw new CustomError("PC-DTO-CHECK", 400);
      }
      console.log("update",req.body)
      return this.projectService.update(+req.params.id, userDto);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.delete(+req.params.id);
    });
  }
}
