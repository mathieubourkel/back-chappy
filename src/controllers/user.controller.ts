import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class UserController extends GlobalController {

  private userService = new Service(User)

}