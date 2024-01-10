import { NextFunction, Response } from "express";
import { Notification } from "../entities/notification.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { RequestWithUserInfo } from "../interfaces/request.interface";

export class NotificationController extends GlobalController {

  private notificationService = new Service(Notification)

  async getNotificationsByUser(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    const searchOptions = { receivers: [{id:req.params.idUser}] };
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.getManyBySearchOptions(searchOptions, [
        "receivers",
        "sender"
      ]);
    });
  }

  async create(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.create(req.body);
    });
  }

  async update(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.update(+req.params.id, req.body);
    });
  }

  async delete(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.delete(+req.params.id);
    });
  }
}