"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_entity_1 = require("../entities/task.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class TaskController extends controller_1.GlobalController {
    taskService = new Service_1.Service(task_entity_1.Task);
    async getTasksByIdStep(req, res, next) {
        const searchOptions = { step: { id: +req.params.idStep } };
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.getManyBySearchOptions(searchOptions, [
                "step",
                "category",
                "users"
            ]);
        });
    }
    async getTasksByIdProject(req, res, next) {
        const searchOptions = { project: { id: +req.params.idProject } };
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.getManyBySearchOptions(searchOptions, [
                "project",
                "category",
                "users"
            ]);
        });
    }
    async getOwnerTasksByIdUser(req, res, next) {
        const searchOptions = { owner: { id: +req.params.idUser } };
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.getManyBySearchOptions(searchOptions, [
                "owner"
            ]);
        });
    }
    async getCollabTasksByIdUser(req, res, next) {
        const searchOptions = { users: { id: +req.params.idUser } };
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.getManyBySearchOptions(searchOptions, [
                "users"
            ]);
        });
    }
    async getTaskById(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.getOneById(+req.params.id, ["category", "owner", "users"]);
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.create(req.body);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.update(+req.params.id, req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.taskService.delete(+req.params.id);
        });
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map