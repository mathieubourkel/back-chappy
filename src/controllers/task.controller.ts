import { NextFunction, Request, Response } from "express";
import { Task } from "../entities/task.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class TaskController extends GlobalController {

  private taskService = new Service(Task)

}