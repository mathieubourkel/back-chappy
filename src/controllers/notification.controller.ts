import { NextFunction, Response, Request } from "express";
import { Notification } from "../entities/notification.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";

export class NotificationController extends GlobalController {

  private notificationService = new Service(Notification)

  async getNotificationsByUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { receivers: [{id:req.params.idUser}] };
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.getManyBySearchOptions(searchOptions, [
        "receivers",
        "sender"
      ]);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.create(req.body);
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.update(+req.params.id, req.body);
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.delete(+req.params.id);
    });
  }
}