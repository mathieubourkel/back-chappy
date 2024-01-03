import { NextFunction, Request, Response } from "express";
import { Project } from "../entities/project.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class ProjectController extends GlobalController {

  private projectService = new Service(Project)

}