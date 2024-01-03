import { CategoryController } from "./controllers/category.controller";
import { GlobalController } from "./controllers/controller";
import { DocumentController } from "./controllers/document.controller";
import { NotificationController } from "./controllers/notification.controller";
import { ProjectController } from "./controllers/project.controller";
import { PurchaseController } from "./controllers/purchase.controller";
import { StepController } from "./controllers/step.controller";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";

export const Routes = [ 

  // PROJECT
  { 
    method: "get",
    route: "/myprojects",
    controller: ProjectController,
    action: "getProjectsFromOwner"
  },
  { 
    method: "get",
    route: "/mycollabs",
    controller: ProjectController,
    action: "getProjectsFromMember"
  },

  { 
    method: "get",
    route: "/project/:id",
    controller: ProjectController,
    action: "getProjectById"
  },

  { 
    method: "get",
    route: "/project/name/:id",
    controller: ProjectController,
    action: "getProjectNameById"
  },

  { 
    method: "post",
    route: "/project",
    controller: ProjectController,
    action: "create"
  },

  { 
    method: "delete",
    route: "/project/:id",
    controller: ProjectController,
    action: "delete"
  },
  { 
    method: "put",
    route: "/project/addUser/:idProject",
    controller: ProjectController,
    action: "addUserToProject"
  },
  { 
    method: "put",
    route: "/project/:id",
    controller: ProjectController,
    action: "update"
  },

  

  // STEP
  { 
    method: "get",
    route: "/steps/:idProject",
    controller: StepController,
    action: "getStepsByIdProject"
  },
  { 
    method: "get",
    route: "/step/:idStep",
    controller: StepController,
    action: "getStepByIdStep"
  },
  { 
    method: "put",
    route: "/step/:id",
    controller: StepController,
    action: "update"
  },
  { 
    method: "post",
    route: "/step",
    controller: StepController,
    action: "create"
  },
  { 
    method: "delete",
    route: "/step/:id",
    controller: StepController,
    action: "delete"
  },

  // TASK

  { 
    method: "get",
    route: "/tasks/step/:idStep",
    controller: TaskController,
    action: "getTasksByIdStep"
  },

  { 
    method: "get",
    route: "/tasks/owner",
    controller: TaskController,
    action: "getOwnerTasksByIdUser"
  },
  { 
    method: "get",
    route: "/tasks/member",
    controller: TaskController,
    action: "getCollabTasksByIdUser"
  },

  { 
    method: "get",
    route: "/task/:id",
    controller: TaskController,
    action: "getTaskById"
  },
  { 
    method: "put",
    route: "/task/:id",
    controller: TaskController,
    action: "update"
  },
  { 
    method: "post",
    route: "/task",
    controller: TaskController,
    action: "create"
  },
  { 
    method: "delete",
    route: "/task/:id",
    controller: TaskController,
    action: "delete"
  },

  //PURCHASE

  { 
    method: "get",
    route: "/purchases/:idProject",
    controller: PurchaseController,
    action: "getPurchasesByIdProject"
  },
  { 
    method: "post",
    route: "/purchase",
    controller: PurchaseController,
    action: "create"
  },
  { 
    method: "put",
    route: "/purchase/:id",
    controller: PurchaseController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/purchase/:id",
    controller: PurchaseController,
    action: "delete"
  },

  // DOCUMENT
  { 
    method: "get",
    route: "/documents/:idProject",
    controller: DocumentController,
    action: "getDocumentsByIdProject"
  },
  { 
    method: "post",
    route: "/document",
    controller: DocumentController,
    action: "create"
  },
  { 
    method: "put",
    route: "/document/:id",
    controller: DocumentController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/document/:id",
    controller: DocumentController,
    action: "delete"
  },

  // CATEGORIE
  { 
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "getAll"
  },
  { 
    method: "post",
    route: "/category",
    controller: CategoryController,
    action: "create"
  },
  { 
    method: "delete",
    route: "/category/:id",
    controller: CategoryController,
    action: "delete"
  },

  // NOTIFICATION

  { 
    method: "get",
    route: "/notifications",
    controller: NotificationController,
    action: "getNotificationsByUser"
  },
  { 
    method: "post",
    route: "/notification",
    controller: NotificationController,
    action: "create"
  },
  { 
    method: "put",
    route: "/notification/:id",
    controller: NotificationController,
    action: "update"
  },
  { 
    method: "delete",
    route: "/notification/:id",
    controller: NotificationController,
    action: "delete"
  },
  
  // COMMENT
  // USER
  { 
    method: "post",
    route: "/user",
    controller: UserController,
    action: "create"
  },

  // COMPANY

  //GLOBAL
    { 
      method: "all",
      route: "*",
      controller: GlobalController,
      action: "badRoute"
    },
    
];
