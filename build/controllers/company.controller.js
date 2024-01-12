"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const company_entity_1 = require("../entities/company.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class CompanyController extends controller_1.GlobalController {
    companyService = new Service_1.Service(company_entity_1.Company);
    async getAll(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.companyService.getAll();
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.companyService.create(req.body);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.companyService.update(+req.params.id, req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.companyService.delete(+req.params.id);
        });
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map