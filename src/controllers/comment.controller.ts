import { NextFunction, Request, Response } from "express";
import { CommentEntity } from "../entities/comment.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CreateCommentDto, ModifyCommentDto } from "../dto/comment.dto";
import {
  validate,
  ValidationError
} from "class-validator";
import {CustomError} from "../utils/CustomError";
import { ProjectEntity } from "../entities/project.entity";

export class CommentController extends GlobalController {

  private commentService:Service = new Service(CommentEntity);
  private projectService:Service = new Service(ProjectEntity);

  async getCommentsByIdProject(req:Request, res:Response, next:NextFunction):Promise<void> {
    const searchOptions : { table:string, idParent:number } = { table:"project", idParent: +req.params.idProject };
    await this.handleGlobal(req, res, next, async (): Promise<unknown> => {
      return this.commentService.getManyBySearchOptions(searchOptions)
    });
  };

  async getCommentsByIdStep(req:Request, res:Response, next:NextFunction):Promise<void> {
    const searchOptions : { table:string, idParent:number } = { table:"step", idParent: +req.params.idStep };
    await this.handleGlobal(req, res, next, async ():Promise<unknown> => {
      return this.commentService.getManyBySearchOptions(searchOptions)
    });
  };

  async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async ():Promise<unknown> => {
      const comment:CreateCommentDto = new CreateCommentDto(req.body);
      comment.author = req.user.userId;

      const errors:ValidationError[] = await validate(comment, { whitelist:true });
      if (errors.length > 0) {
        throw new CustomError("CC-DTO-CHECK", 400);
      }

      const project:any = await this.projectService.getOneById(comment.idProject, ["users", "owner"], {id:true, users: {id:true}, owner: {id:true}});
      if(project.owner.id != req.user.userId && !project.users.find((user: { id: number }):boolean => user.id === req.user.userId)) throw new CustomError("CC-NO-RIGHTS", 403);

      console.log(project)
      return this.commentService.create(comment)
    });
  };

  async update(req:Request, res:Response, next: NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async ():Promise<any>=> {
      const comment:any = new ModifyCommentDto(req.body);
      const errors:ValidationError[] = await validate(comment, {whitelist: true});

      if (errors.length > 0 ) {
        throw new CustomError("CC-DTO-CHECK", 400);
      }

      const upToUpdate:any = await this.commentService.getOneById(+req.params.id, ["author"], {id:true, author: {id: true}});

      if (!upToUpdate) throw new CustomError("CC-NFC-CHECK", 400);
      if (req.user.userId !== upToUpdate.author.id) throw new CustomError("CC-NAU-CHECK", 403);

      return this.commentService.update(upToUpdate.id, comment)
    });
  };

  async delete(req:Request, res:Response, next:NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async () : Promise<unknown> => {
      return this.commentService.delete(+req.params.id)
    });
  };
}