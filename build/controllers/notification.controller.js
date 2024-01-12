"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_entity_1 = require("../entities/notification.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class NotificationController extends controller_1.GlobalController {
    notificationService = new Service_1.Service(notification_entity_1.Notification);
    async getNotificationsByUser(req, res, next) {
        const searchOptions = { receivers: [{ id: req.params.idUser }] };
        await this.handleGlobal(req, res, next, async () => {
            return this.notificationService.getManyBySearchOptions(searchOptions, [
                "receivers",
                "sender"
            ]);
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.notificationService.create(req.body);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.notificationService.update(+req.params.id, req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.notificationService.delete(+req.params.id);
        });
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map