import { AuthController } from "../controllers/auth.controller";
import { CompanyController } from "../controllers/company.controller";
import { UserController } from "../controllers/user.controller";
import { LoginDto } from "../dto/auth.dto";
import { CreateCompanyDto } from "../dto/company.dto";
import { CreateUserDto } from "../dto/user.dto";

export const AuthRoutes = [ 
{ 
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
    middlewares: [{name: 'dto', classDto: LoginDto}]
  },
  { 
    method: "get",
    route: "/auth/refreshToken",
    controller: AuthController,
    action: "refreshToken",
    middlewares: [{name: 'refreshToken'}]
  },
  { 
    method: "post",
    route: "/auth/register",
    controller: UserController,
    action: "create",
    middlewares: [{name: 'dto', classDto: CreateUserDto}]
  },
  { 
    method: "post",
    route: "/auth/company/register",
    controller: CompanyController,
    action: "create",
    middlewares: [{name: 'dto', classDto: CreateCompanyDto}]
  },
  { 
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "getAll",
    middlewares: [{name: 'checkToken'}]
  },

  {
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "getInfosUserConnected",
    middlewares: [{name: 'checkToken'}]
  },

  { 
    method: "put",
    route: "/api/user/:id",
    controller: UserController,
    action: "update",
    middlewares: [{name: 'checkToken'},
    {name: "dto", classDto: CreateUserDto}]
  },
  { 
    method: "delete",
    route: "/api/user/:id",
    controller: UserController,
    action: "delete",
    middlewares: [{name: 'checkToken'}]
  },

  // COMPANY

  { 
    method: "get",
    route: "/api/companies",
    controller: CompanyController,
    action: "getAll",
    middlewares: [{name: 'checkToken'}]
  },
  
  { 
    method: "put",
    route: "/api/company/:id",
    controller: CompanyController,
    action: "update",
    middlewares: [{name: 'checkToken'},
    {name: "dto", classDto: CreateCompanyDto}]
  },
  { 
    method: "delete",
    route: "/api/company/:id",
    controller: CompanyController,
    action: "delete",
    middlewares: [{name: 'checkToken'}]
  }, 
]