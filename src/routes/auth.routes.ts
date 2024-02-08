import { AuthController } from "../controllers/auth.controller";
import { CompanyController } from "../controllers/company.controller";
import { UserController } from "../controllers/user.controller";
import { LoginDto } from "../dto/auth.dto";
import { CompanyDto } from "../dto/company.dto";
import { CreateUserDto, CreateUserWithCompany, RejoinCompany, ResetPwd } from "../dto/user.dto";

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
    method: "put",
    route: "/auth/resetPwd",
    controller: UserController,
    action: "resetPwd",
    middlewares: [{name: 'dto', classDto: ResetPwd}]
  },
  { 
    method: "put",
    route: "/api/user/rejoinCompany",
    controller: UserController,
    action: "companyRejoin",
    middlewares: [{name: 'checkToken'},
    {name: 'dto', classDto: RejoinCompany}]
  },
  { 
    method: "put",
    route: "/api/user/quitCompany",
    controller: UserController,
    action: "quitCompany",
    middlewares: [{name: 'checkToken'}]
  },
  { 
    method: "post",
    route: "/auth/registerWithCompany",
    controller: UserController,
    action: "create",
    middlewares: [{name: 'dto', classDto: CreateUserWithCompany}]
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
    route: "/api/user",
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
    method: "post",
    route: "/auth/company/register",
    controller: CompanyController,
    action: "create",
    middlewares: [{name: "dto", classDto:CompanyDto }]
  },
  { 
    method: "put",
    route: "/api/company/:id",
    controller: CompanyController,
    action: "update",
    middlewares: [{name: "dto", classDto: CompanyDto}]
  },
  // {name: 'checkToken'},
  { 
    method: "get",
    route: "/api/companies",
    controller: CompanyController,
    action: "getAllCompanies",
    // middlewares: [{name: 'checkToken'}]
  },
  { 
    method: "delete",
    route: "/api/company/:id",
    controller: CompanyController,
    action: "delete",
    // middlewares: [{name: 'checkToken'}]
  },
  { 
    method: "post",
    route: "/api/company",
    controller: CompanyController,
    action: "createWhenLogged",
    middlewares: [{name: 'checkToken'},
    {name:'dto', classDto: CompanyDto}]
  }  
]