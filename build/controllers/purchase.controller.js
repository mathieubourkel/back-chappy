"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const purchase_entity_1 = require("../entities/purchase.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class PurchaseController extends controller_1.GlobalController {
    purchaseService = new Service_1.Service(purchase_entity_1.Purchase);
    async getPurchasesByIdProject(req, res, next) {
        const searchOptions = { project: { id: +req.params.idProject } };
        await this.handleGlobal(req, res, next, async () => {
            return this.purchaseService.getManyBySearchOptions(searchOptions, [
                "project"
            ]);
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.purchaseService.create(req.body);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.purchaseService.update(+req.params.id, req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.purchaseService.delete(+req.params.id);
        });
    }
}
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchase.controller.js.map