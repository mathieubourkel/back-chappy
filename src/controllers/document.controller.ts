import { NextFunction, Request, Response } from "express";
import { Document } from "../entities/document.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class DocumentController extends GlobalController {

  private documentService = new Service(Document)

}