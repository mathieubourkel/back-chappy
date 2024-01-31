import { ProjectController } from "../controllers/project.controller";
import { CreateProjectDto, ProjectDto } from "../dto/project.dto";

export const ProjectRoutes = [ 

  
    // PROJECT
    { 
      method: "get",
      route: "/api/myprojects",
      controller: ProjectController,
      action: "getProjectsFromOwner",
      middlewares: [{name: 'checkToken'}]
    },
    { 
      method: "get",
      route: "/api/mycollabs",
      controller: ProjectController,
      action: "getProjectsFromMember",
      middlewares: [{name: 'checkToken'}]
    },
    { 
      method: "get",
      route: "/api/project/:id",
      controller: ProjectController,
      action: "getProjectById",
      middlewares: [{name: 'checkToken'}]
    },
    {
      method: "get",
      route: "/api/project/:idProject/members",
      controller: ProjectController,
      action: "getMembersByProject",
      middlewares: [{name: 'checkToken'}]
    },
    { 
      method: "post",
      route: "/api/project",
      controller: ProjectController,
      action: "create",
      middlewares: [
        {name:'checkToken'},
        {name: "dto", classDto: CreateProjectDto}
        ]
    },
    { 
      method: "put",
      route: "/api/project/addUser/:idProject",
      controller: ProjectController,
      action: "addUserToProject",
      middlewares: [{name: 'checkToken'}]
    },
    { 
      method: "put",
      route: "/api/project/:id",
      controller: ProjectController,
      action: "update",
      middlewares: [
        {name: 'checkToken'},
        {name: "dto", classDto: ProjectDto}
    ]
    },
    { 
      method: "put",
      route: "/api/rejoin",
      controller: ProjectController,
      action: "joinProjectByCode",
      middlewares: [{name: 'checkToken'}]
    },
    { 
      method: "delete",
      route: "/api/project/:id",
      controller: ProjectController,
      action: "delete",
      middlewares: [{name: 'checkToken'}]
    }
]