"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_entity_1 = require("../entities/comment.entity");
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
class CommentController extends controller_1.GlobalController {
    commentService = new Service_1.Service(comment_entity_1.Comment);
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map