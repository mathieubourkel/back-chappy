import { NextFunction, Request, Response } from "express";
import { Project } from "../entities/project.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";
import { User } from "../entities/user.entity";

export class ProjectController extends GlobalController {
  private projectService = new Service(Project);
  private userService = new Service(User);

  async getProjectsFromOwner(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { owner: req.body.idUser };
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.getManyBySearchOptions(searchOptions, [
        "steps",
      ]);
    });
  }

  async getProjectsFromMember(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { users: [req.body.idUser] };
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
      const select = { name: true };
      return this.projectService.getOneById(+req.params.id, [], { name: true });
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.create(req.body);
    });
  }

  async addUserToProject(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const project: any = await this.projectService.getOneById(+req.params.id);
      const user: any = await this.userService.getOneById(req.body.id);
      project.users.push(user);
      return this.projectService.update(+req.params.id, project);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.projectService.delete(+req.params.id);
    });
  }
}
