import { AuthController } from "./controllers/auth.controller";
import { CategoryController } from "./controllers/category.controller";
import { CompanyController } from "./controllers/company.controller";
import { DocumentController } from "./controllers/document.controller";
import { NotificationController } from "./controllers/notification.controller";
import { ProjectController } from "./controllers/project.controller";
import { PurchaseController } from "./controllers/purchase.controller";
import { StepController } from "./controllers/step.controller";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";
import { CommentController } from "./controllers/comment.controller";
import { CreateProjectDto, ProjectDto } from "./dto/project.dto";
import { CreateStepDto, StepDto } from "./dto/step.dto";
import { CreateTaskDto, TaskDto } from "./dto/task.dto";
import { LoginDto } from "./dto/auth.dto";
import { CreateUserDto } from "./dto/user.dto";
import { CreateCategoryDto } from "./dto/category.dto";
import { CreatePurchaseDto, PurchaseDto } from "./dto/purchase.dto";
import { CreateCompanyDto } from "./dto/company.dto";
import { CreateNotificationDto } from "./dto/notification.dto";



export const Routes = [ 

  { 
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
    dto: LoginDto
  },
  { 
    method: "get",
    route: "/auth/refreshToken",
    controller: AuthController,
    action: "refreshToken"
  },
  { 
    method: "post",
    route: "/auth/register",
    controller: UserController,
    action: "create",
    dto: CreateUserDto
  },
  { 
    method: "post",
    route: "/auth/company/register",
    controller: CompanyController,
    action: "create",
    dto: CreateCompanyDto
  },
  // PROJECT
  { 
    method: "get",
    route: "/api/myprojects",
    controller: ProjectController,
    action: "getProjectsFromOwner"
  },
  { 
    method: "get",
    route: "/api/mycollabs",
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
    method: "get",
    route: "/api/project/:idProject/members",
    controller: ProjectController,
    action: "getMembersByProject"
  },
  { 
    method: "post",
    route: "/api/project",
    controller: ProjectController,
    action: "create",
    dto: CreateProjectDto
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
    action: "update",
    dto: ProjectDto
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
    action: "create",
    dto: CreateStepDto
  },
  { 
    method: "put",
    route: "/api/step/:id",
    controller: StepController,
    action: "update",
    dto: StepDto
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

  // idUser useless / Use token
  { 
    method: "get",
    route: "/api/tasks/owner/:idUser",
    controller: TaskController,
    action: "getOwnerTasksByIdUser"
  },

  // idUser useless / Use token
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
    action: "update",
    dto: TaskDto
  },
  { 
    method: "post",
    route: "/api/task",
    controller: TaskController,
    action: "create",
    dto: CreateTaskDto
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
    action: "create",
    dto: CreatePurchaseDto
  },
  { 
    method: "put",
    route: "/api/purchase/:id",
    controller: PurchaseController,
    action: "update",
    dto: PurchaseDto
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
    action: "create",
    dto: CreateCategoryDto
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
    action: "create",
    dto: CreateNotificationDto
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
    action: "update",
    dto: CreateUserDto
  },

  {
    method: "post",
    route: "/api/user",
    controller: UserController,
    action: "create",
    middleware: [
      dtoMiddleware(CreateUserDto),
      authMiddleware(),
    ]

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
    action: "update",
    dto: CreateCompanyDto
  },
  { 
    method: "delete",
    route: "/api/company/:id",
    controller: CompanyController,
    action: "delete"
  }, 
];



function dtoMiddleware(value) {
  return { name: middlewareName.DTO, value}
}

enum middlewareName {
  DTO = 'dto',
  AUTH = 'auth'
}
interface OptionMiddlewareInterface {
  role ?: number;
}

function authMiddleware(options?: OptionMiddlewareInterface) {
  return { name:middlewareName.AUTH, options}
}