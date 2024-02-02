import { NextFunction, Response, Request } from "express";
import { NotificationEntity } from "../entities/notification.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";

export class NotificationController extends GlobalController {

  private notificationService = new Service(NotificationEntity)

  async getNotificationsByUser(req: Request, res: Response, next: NextFunction) {
    const searchOptions = { receivers: { id: +req.user.userId } };
    await this.handleGlobal(req, res, next, async () => {
      return this.notificationService.getManyBySearchOptions<Array<NotificationEntity>>(searchOptions, ["receivers","sender"]);
    });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      req.body.sender = req.user.userId
      req.body.receivers = req.body.receivers.map((elem: number) => {
        return { id: elem };
      });
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