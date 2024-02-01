import { NextFunction, Response, Request } from "express";
import { DocumentEntity } from "../entities/document.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CacheEnum } from "../enums/cache.enum";
import { CustomError } from "../middlewares/error.handler.middleware";
import { cleanResDataDocument, cleanResDataDocumentForDel } from "../dto/document.dto";

export class DocumentController extends GlobalController {

  private documentService = new Service(DocumentEntity)

  async getDocumentsByIdProject(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { project: {id:+req.params.idProject} };
    await this.handleGlobal(req, res, next, async () => {
      return this.documentService.getManyBySearchOptions(searchOptions, ["project"]);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      this.delCache(CacheEnum.DOCUMENTS, {params: req.body.project})
      return this.documentService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result = await this.documentService.update(+req.params.id, req.body, ["project"], cleanResDataDocument);
      this.delCache(CacheEnum.DOCUMENTS, {params: result.project.id})
      this.delCache(CacheEnum.DOCUMENT, {params: result.id})
      return result;
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const result:DocumentEntity = await this.documentService.getOneById<DocumentEntity>(+req.params.id, ["project", "project.owner"], cleanResDataDocumentForDel);
      if (result.project.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403); 
      this.delCache(CacheEnum.DOCUMENTS, {params: result.project.id})
      this.delCache(CacheEnum.DOCUMENT, {params: result.id})
      return await this.documentService.delete(result.id);
    });
  }
}