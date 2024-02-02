import { CommentController } from "../controllers/comment.controller";
import {CreateCommentDto, ModifyCommentDto} from "../dto/comment.dto";

export const CommentRoutes = [
    {
        method: "get",
        route: "/api/comments/project/:idProject",
        controller: CommentController,
        action: "getCommentsByIdProject",
        middlewares: [{name: 'checkToken'}]
      },
      {
        method: "get",
        route: "/api/comments/step/:idStep",
        controller: CommentController,
        action: "getCommentsByIdStep",
        middlewares: [{name: 'checkToken'}]
      },
      {
        method: "post",
        route: "/api/comment",
        controller: CommentController,
        action: "create",
        middlewares: [
            {name: 'checkToken'},
            {name: "dto", classDto: CreateCommentDto}
        ]
      },
      {
        method: "put",
        route:"/api/comment/:id",
        controller: CommentController,
        action: "update",
        middlewares: [
            {name: 'checkToken'},
            {name: "dto", classDto: ModifyCommentDto}
        ]
      },
      {
        method: "delete",
        route:"/api/comment/:id",
        controller: CommentController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      },
]