"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepController = void 0;
const step_entity_1 = require("../entities/step.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class StepController extends controller_1.GlobalController {
    stepService = new Service_1.Service(step_entity_1.Step);
    async getStepsByIdProject(req, res, next) {
        const searchOptions = { project: { id: +req.params.idProject } };
        await this.handleGlobal(req, res, next, async () => {
            return this.stepService.getManyBySearchOptions(searchOptions);
        });
    }
    async getStepByIdStep(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.stepService.getOneById(+req.params.idStep, ["tasks", "project"]);
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.stepService.create(req.body);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.stepService.update(+req.params.id, req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.stepService.delete(+req.params.id);
        });
    }
}
exports.StepController = StepController;
//# sourceMappingURL=step.controller.js.map