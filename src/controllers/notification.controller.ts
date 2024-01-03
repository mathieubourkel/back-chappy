import { NextFunction, Request, Response } from "express";
import { Notification } from "../entities/notification.entity";
import { Service } from "../services/Service";
import { CustomError } from "../utils/CustomError";
import { GlobalController } from "./controller";

export class NotificationController extends GlobalController {

  private notificationService = new Service(Notification)

}