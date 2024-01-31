import { CommentController } from "../controllers/comment.controller";

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
        middlewares: [{name: 'checkToken'}]
      },
      {
        method: "put",
        route:"/api/comment/:id",
        controller: CommentController,
        action: "update",
        middlewares: [{name: 'checkToken'}]
      },
      {
        method: "delete",
        route:"/api/comment/:id",
        controller: CommentController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      },
]