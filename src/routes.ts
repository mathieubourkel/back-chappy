import { AuthController } from "./controllers/auth.controller";
import { CategoryController } from "./controllers/category.controller";
import { CompanyController } from "./controllers/company.controller";
import { GlobalController } from "./controllers/controller";
import { DocumentController } from "./controllers/document.controller";
import { NotificationController } from "./controllers/notification.controller";
import { ProjectController } from "./controllers/project.controller";
import { PurchaseController } from "./controllers/purchase.controller";
import { StepController } from "./controllers/step.controller";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";
import { CommentController } from "./controllers/comment.controller";

export const Routes = [ 

  { 
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login"
  },
  { 
    method: "get",
    route: "/auth/refreshToken",
    controller: AuthController,
    action: "refreshToken"
  },
  { 
    method: "post",
    route: "/auth/logout",
    controller: AuthController,
    action: "logout"
  },
  { 
    method: "post",
    route: "/auth/register",
    controller: UserController,
    action: "create"
  },
  { 
    method: "post",
    route: "/auth/company/register",
    controller: CompanyController,
    action: "create"
  },
  // PROJECT

  // ENLEVER :IdUSER pour passer par le token
  { 
    method: "get",
    route: "/api/myprojects/:idUser",
    controller: ProjectController,
    action: "getProjectsFromOwner"
  },
  { 
    method: "get",
    route: "/api/mycollabs/:idUser",
    controller: ProjectController,
    action: "getProjectsFromMember"
  },

  { 
    method: "get",
    route: "/api/project/:id",
    controller: ProjectController,
    action: "getProjectById"
  },
  { 
    method: "post",
    route: "/api/project",
    controller: ProjectController,
    action: "create"
  },
  { 
    method: "put",
    route: "/api/project/addUser/:idProject",
    controller: ProjectController,
    action: "addUserToProject"
  },
  { 
    method: "put",
    route: "/api/project/:id",
    controller: ProjectController,
    action: "update"
  },
  { 
    method: "put",
    route: "/api/rejoin",
    controller: ProjectController,
    action: "joinProjectByCode"
  },
  { 
    method: "delete",
    route: "/api/project/:id",
    controller: ProjectController,
    action: "delete"
  },

  // STEP
  { 
    method: "get",
    route: "/api/step/:id",
    controller: StepController,
    action: "getStepById"
  },
  { 
    method: "post",
    route: "/api/step",
    controller: StepController,
    action: "create"
  },
  { 
    method: "put",
    route: "/api/step/:id",
    controller: StepController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/api/step/:id",
    controller: StepController,
    action: "delete"
  },

  // TASK

  { 
    method: "get",
    route: "/api/tasks/step/:idStep",
    controller: TaskController,
    action: "getTasksByIdStep"
  },

  { 
    method: "get",
    route: "/api/tasks/project/:idProject",
    controller: TaskController,
    action: "getTasksByIdProject"
  },

  { 
    method: "get",
    route: "/api/tasks/owner/:idUser",
    controller: TaskController,
    action: "getOwnerTasksByIdUser"
  },
  { 
    method: "get",
    route: "/api/tasks/member/:idUser",
    controller: TaskController,
    action: "getCollabTasksByIdUser"
  },

  { 
    method: "get",
    route: "/api/task/:id",
    controller: TaskController,
    action: "getTaskById"
  },
  { 
    method: "put",
    route: "/api/task/:id",
    controller: TaskController,
    action: "update"
  },
  { 
    method: "put",
    route: "/api/task/:idTask/delete/:idUser",
    controller: TaskController,
    action: "update"
  },
  { 
    method: "post",
    route: "/api/task",
    controller: TaskController,
    action: "create"
  },
  { 
    method: "delete",
    route: "/api/task/:id",
    controller: TaskController,
    action: "delete"
  },

  //PURCHASE

  { 
    method: "get",
    route: "/api/purchases/:idProject",
    controller: PurchaseController,
    action: "getPurchasesByIdProject"
  },
  { 
    method: "post",
    route: "/api/purchase",
    controller: PurchaseController,
    action: "create"
  },
  { 
    method: "put",
    route: "/api/purchase/:id",
    controller: PurchaseController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/api/purchase/:id",
    controller: PurchaseController,
    action: "delete"
  },

  // DOCUMENT
  { 
    method: "get",
    route: "/api/documents/:idProject",
    controller: DocumentController,
    action: "getDocumentsByIdProject"
  },
  { 
    method: "post",
    route: "/api/document",
    controller: DocumentController,
    action: "create"
  },
  { 
    method: "put",
    route: "/api/document/:id",
    controller: DocumentController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/api/document/:id",
    controller: DocumentController,
    action: "delete"
  },

  // CATEGORY
  { 
    method: "get",
    route: "/api/categories",
    controller: CategoryController,
    action: "getAll"
  },
  { 
    method: "post",
    route: "/api/category",
    controller: CategoryController,
    action: "create"
  },
  { 
    method: "delete",
    route: "/api/category/:id",
    controller: CategoryController,
    action: "delete"
  },

  // NOTIFICATION

  { 
    method: "get",
    route: "/api/notifications/:idUser",
    controller: NotificationController,
    action: "getNotificationsByUser"
  },
  { 
    method: "post",
    route: "/api/notification",
    controller: NotificationController,
    action: "create"
  },
  { 
    method: "put",
    route: "/api/notification/:id",
    controller: NotificationController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/api/notification/:id",
    controller: NotificationController,
    action: "delete"
  },
  
  // COMMENT

  {
    method: "get",
    route: "/api/comments/project/:idProject",
    controller: CommentController,
    action: "getCommentsByIdProject"
  },
  {
    method: "get",
    route: "/api/comments/step/:idStep",
    controller: CommentController,
    action: "getCommentsByIdStep"
  },
  {
    method: "post",
    route: "/api/comment",
    controller: CommentController,
    action: "create"
  },
  {
    method: "put",
    route:"/api/comment/:id",
    controller: CommentController,
    action: "update"
  },
  {
    method: "delete",
    route:"/api/comment/:id",
    controller: CommentController,
    action: "delete"
  },


  // USER
  { 
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "getAll"
  },

  {
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "getInfosUserConnected"
  },

  { 
    method: "put",
    route: "/api/user/:id",
    controller: UserController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/api/user/:id",
    controller: UserController,
    action: "delete"
  },

  // COMPANY

  { 
    method: "get",
    route: "/api/companies",
    controller: CompanyController,
    action: "getAll"
  },
  
  { 
    method: "put",
    route: "/api/company/:id",
    controller: CompanyController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/api/company/:id",
    controller: CompanyController,
    action: "delete"
  },

  //GLOBAL
    { 
      method: "all",
      route: "*",
      controller: GlobalController,
      action: "badRoute"
    },
    
];
