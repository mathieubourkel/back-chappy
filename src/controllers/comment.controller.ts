import { NextFunction, Request, Response } from "express";
import { CommentEntity } from "../entities/comment.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CreateCommentDto, ModifyCommentDto } from "../dto/comment.dto";
import {
  validate,
  ValidationError
} from "class-validator";
import { ProjectEntity } from "../entities/project.entity";
import { CustomError } from "../middlewares/error.handler.middleware";
import {CacheEnum} from "../enums/cache.enum";

export class CommentController extends GlobalController {

  private commentService:Service = new Service(CommentEntity);
  private projectService:Service = new Service(ProjectEntity);

  async getCommentsByIdProject(req:Request, res:Response, next:NextFunction):Promise<void> {
    const searchOptions : { table:string, idParent:number } = { table:"project", idParent: +req.params.idProject };
    await this.handleGlobal(req, res, next, async (): Promise<unknown> => {
      return await this.proceedCache<Array<CommentEntity>>(CacheEnum.COMMENTS_PROJECT, async () => this.commentService.getManyBySearchOptions(searchOptions), {params: req.params.idProject});
    });
  };

  async getCommentsByIdStep(req:Request, res:Response, next:NextFunction):Promise<void> {
    const searchOptions : { table:string, idParent:number } = { table:"step", idParent: +req.params.idStep };
    await this.handleGlobal(req, res, next, async ():Promise<unknown> => {
      return await this.proceedCache<Array<CommentEntity>>(CacheEnum.COMMENTS_STEP, async () => this.commentService.getManyBySearchOptions(searchOptions), {params: req.params.idStep});
    });
  };

  async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async ():Promise<unknown> => {
      const project:any = await this.projectService.getOneById(req.body.idProject, ["users", "owner"], {id:true, users: {id:true}, owner: {id:true}});

      if (req.body.table == "project") await this.delCache(CacheEnum.COMMENTS_PROJECT, {params: req.body.idParent});
      if (req.body.table == "step") await this.delCache(CacheEnum.COMMENTS_STEP, {params: req.body.idParent});

      req.body.author = req.user.userId;

      if(project.owner.id != req.user.userId && !project.users.find((user: { id: number }):boolean => user.id === req.user.userId)) throw new CustomError("CC-NO-RIGHTS", 403);
      return this.commentService.create(req.body)
    });
  };

  async update(req:Request, res:Response, next: NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async ():Promise<any>=> {
      const comment:CommentEntity = await this.commentService.getOneById(+req.params.id, ["author"], {id:true, author: {id: true}, content: true, table: true});

      if (!comment) throw new CustomError("CC-NFC-CHECK", 400);
      if (req.user.userId !== comment.author.id) throw new CustomError("CC-NAU-CHECK", 403);

      if (comment.table == "project") await this.delCache(CacheEnum.COMMENTS_PROJECT, {params: req.params.id});
      if (comment.table == "step") await this.delCache(CacheEnum.COMMENTS_STEP, {params: req.params.id});

      console.log(comment)

      return this.commentService.update(comment.id, req.body)

    });
  };

  async delete(req:Request, res:Response, next:NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async () : Promise<unknown> => {
      const comment:any = await this.commentService.getOneById(+req.params.id, ["author"], {id:true, author: {id: true}});
      if (req.user.userId !== comment.author.id) throw new CustomError("CC-NAU-CHECK", 403);
      if (!comment) throw new CustomError("CC-COM-NOTFIND", 400);
      if (comment.table == "project") await this.delCache(CacheEnum.COMMENTS_PROJECT, {params: req.params.id});
      if (comment.table == "step") await this.delCache(CacheEnum.COMMENTS_STEP, {params: req.params.id});
      return this.commentService.delete(+req.params.id)
    });
  };
}