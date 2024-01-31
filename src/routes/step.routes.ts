import { StepController } from "../controllers/step.controller";
import { CreateStepDto, StepDto } from "../dto/step.dto";

export const StepRoutes = [{ 
    method: "get",
    route: "/api/step/:id",
    controller: StepController,
    action: "getStepById",
    middlewares: [{name: 'checkToken'}]
  },
  { 
    method: "post",
    route: "/api/step",
    controller: StepController,
    action: "create",
    middlewares: [{name: 'checkToken'},
    {name: "dto", classDto: CreateStepDto}]
  },
  { 
    method: "put",
    route: "/api/step/:id",
    controller: StepController,
    action: "update",
    middlewares: [{name: 'checkToken'},
    {name: "dto", classDto: StepDto}]
  },
  { 
    method: "delete",
    route: "/api/step/:id",
    controller: StepController,
    action: "delete",
    middlewares: [{name: 'checkToken'}]
  }
]
