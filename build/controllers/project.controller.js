"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_entity_1 = require("../entities/project.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
const user_entity_1 = require("../entities/user.entity");
const project_dto_1 = require("../dto/project.dto");
const class_validator_1 = require("class-validator");
const CustomError_1 = require("../utils/CustomError");
class ProjectController extends controller_1.GlobalController {
    projectService = new Service_1.Service(project_entity_1.Project);
    userService = new Service_1.Service(user_entity_1.User);
    async getProjectsFromOwner(req, res, next) {
        const searchOptions = { owner: { id: +req.user.userId } };
        await this.handleGlobal(req, res, next, async () => {
            return this.projectService.getManyBySearchOptions(searchOptions, [
                "steps",
            ]);
        });
    }
    async getProjectsFromMember(req, res, next) {
        const searchOptions = { users: { id: +req.user.userId } };
        await this.handleGlobal(req, res, next, async () => {
            return this.projectService.getManyBySearchOptions(searchOptions, [
                "steps",
                "owner",
            ]);
        });
    }
    async getProjectById(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.projectService.getOneById(+req.params.id, ["steps", "owner"]);
        });
    }
    async getProjectNameById(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.projectService.getOneById(+req.params.id, [], { name: true });
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            const userDto = new project_dto_1.CreateProjectDto(req.body);
            const errors = await (0, class_validator_1.validate)(userDto, { whitelist: true });
            if (errors.length > 0) {
                throw new CustomError_1.CustomError("PC-DTO-CHECK", 400);
            }
            userDto.users = userDto.users.map((elem) => {
                return { id: elem };
            });
            return this.projectService.create(userDto);
        });
    }
    async addUserToProject(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            const project = await this.projectService.getOneById(+req.params.idProject, ["users"]);
            const user = await this.userService.getOneById(req.body.idUser);
            project.users.push(user);
            return this.projectService.update(+req.params.idProject, project);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            const userDto = new project_dto_1.ModifyProjectDto(req.body);
            const errors = await (0, class_validator_1.validate)(userDto, { whitelist: true });
            console.log(errors);
            console.log(userDto);
            if (errors.length > 0) {
                throw new CustomError_1.CustomError("PC-DTO-CHECK", 400);
            }
            console.log("update", req.body);
            return this.projectService.update(+req.params.id, userDto);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.projectService.delete(+req.params.id);
        });
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map