"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_entity_1 = require("../entities/category.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class CategoryController extends controller_1.GlobalController {
    categoryService = new Service_1.Service(category_entity_1.Category);
    async getAll(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.categoryService.getAll();
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.categoryService.create(req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.categoryService.delete(+req.params.id);
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map