"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_entity_1 = require("../entities/user.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController extends controller_1.GlobalController {
    userService = new Service_1.Service(user_entity_1.User);
    async __hashPassword(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    async getAll(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.userService.getAll();
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            req.body.password = await this.__hashPassword(req.body.password);
            return this.userService.create(req.body);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.userService.update(+req.params.id, req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.userService.delete(+req.params.id);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map