import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities/comment.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import {
  CreateCommentDto, ModifyCommentDto
} from "../dto/comment.dto";
import {
  validate,
  ValidationError
} from "class-validator";
import {CustomError} from "../utils/CustomError";

export class CommentController extends GlobalController {

  private commentService = new Service(Comment)

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

      console.log(comment)
      const errors:ValidationError[] = await validate(comment, { whitelist:true });
      if (errors.length > 0) {
        throw new CustomError("PC-DTO-CHECK", 400);
      }
      return this.commentService.create(comment)
    });
  };

  async update(req:Request, res:Response, next: NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async ():Promise<any>=> {
      const upToUpdate:any = await this.commentService.getOneById(+req.params.id, ["author"], {id:true, author: {id: true}});

      if (!upToUpdate) throw new CustomError("PC-NFC-CHECK", 400);
      if (req.user.userId !== upToUpdate.author.id) throw new CustomError("PC-NAU-CHECK", 403);

      const comment:any = new ModifyCommentDto(req.body);
      const errors:ValidationError[] = await validate(comment, {whitelist: true});

      if (errors.length > 0 ) {
        throw new CustomError("PC-DTO-CHECK", 400);
      }

      return this.commentService.update(upToUpdate.id, comment)
    });
  };

  async delete(req:Request, res:Response, next:NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async () : Promise<unknown> => {
      return this.commentService.delete(+req.params.id)
    });
  };



}