import { NextFunction, Request, Response } from "express";
import { Document } from "../entities/document.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class DocumentController extends GlobalController {

  private documentService = new Service(Document)

  async getDocumentsByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: {id:+req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.getManyBySearchOptions(searchOptions, [
        "project"
      ]);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.delete(+req.params.id);
    });
  }
}