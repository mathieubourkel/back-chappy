import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities/comment.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";

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
      return this.commentService.create(req.body)
    });
  };

  async update(req:Request, res:Response, next: NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async ():Promise<any>=> {
      return this.commentService.update(+req.params.id, req.body)
    });
  };

  async delete(req:Request, res:Response, next:NextFunction):Promise<void> {
    await this.handleGlobal(req, res, next, async () : Promise<unknown> => {
      return this.commentService.delete(+req.params.id)
    });
  };



}