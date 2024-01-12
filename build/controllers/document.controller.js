"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const document_entity_1 = require("../entities/document.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class DocumentController extends controller_1.GlobalController {
    documentService = new Service_1.Service(document_entity_1.Document);
    async getDocumentsByIdProject(req, res, next) {
        const searchOptions = { project: { id: +req.params.idProject } };
        await this.handleGlobal(req, res, next, async () => {
            return this.documentService.getManyBySearchOptions(searchOptions, [
                "project"
            ]);
        });
    }
    async create(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.documentService.create(req.body);
        });
    }
    async update(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.documentService.update(+req.params.id, req.body);
        });
    }
    async delete(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            return this.documentService.delete(+req.params.id);
        });
    }
}
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map