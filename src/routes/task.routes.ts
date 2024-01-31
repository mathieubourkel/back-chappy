import { TaskController } from "../controllers/task.controller";
import { CreateTaskDto, TaskDto } from "../dto/task.dto";

export const TaskRoutes = [
    { 
        method: "get",
        route: "/api/tasks/step/:idStep",
        controller: TaskController,
        action: "getTasksByIdStep",
        middlewares: [{name: 'checkToken'}]
      },
    
      { 
        method: "get",
        route: "/api/tasks/project/:idProject",
        controller: TaskController,
        action: "getTasksByIdProject",
        middlewares: [{name: 'checkToken'}]
      },
    
      // idUser useless / Use token
      { 
        method: "get",
        route: "/api/tasks/owner/:idUser",
        controller: TaskController,
        action: "getOwnerTasksByIdUser",
        middlewares: [{name: 'checkToken'}]
      },
    
      // idUser useless / Use token
      { 
        method: "get",
        route: "/api/tasks/member/:idUser",
        controller: TaskController,
        action: "getCollabTasksByIdUser",
        middlewares: [{name: 'checkToken'}]
      },
    
      { 
        method: "get",
        route: "/api/task/:id",
        controller: TaskController,
        action: "getTaskById",
        middlewares: [{name: 'checkToken'}]
      },
      { 
        method: "put",
        route: "/api/task/:id",
        controller: TaskController,
        action: "update",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: TaskDto}]
      },
      { 
        method: "post",
        route: "/api/task",
        controller: TaskController,
        action: "create",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: CreateTaskDto}]
      },
      { 
        method: "delete",
        route: "/api/task/:id",
        controller: TaskController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      }
]