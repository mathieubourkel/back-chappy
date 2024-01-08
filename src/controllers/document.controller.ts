import { NextFunction, Response } from "express";
import { Document } from "../entities/document.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { RequestWithUserInfo } from "../middlewares/RequestWithUserInfo";

export class DocumentController extends GlobalController {

  private documentService = new Service(Document)

  async getDocumentsByIdProject(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    const searchOptions = { project: {id:+req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.getManyBySearchOptions(searchOptions, [
        "project"
      ]);
    });
  }

  async create(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.create(req.body);
    });
  }

  async update(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.update(+req.params.id, req.body);
    });
  }

  async delete(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.delete(+req.params.id);
    });
  }
}