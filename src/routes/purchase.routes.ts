import { PurchaseController } from "../controllers/purchase.controller";
import { CreatePurchaseDto, PurchaseDto } from "../dto/purchase.dto";

export const PurchaseRoutes = [
    { 
        method: "get",
        route: "/api/purchases/:idProject",
        controller: PurchaseController,
        action: "getPurchasesByIdProject",
        middlewares: [{name: 'checkToken'}]
      },
      { 
        method: "post",
        route: "/api/purchase",
        controller: PurchaseController,
        action: "create",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: CreatePurchaseDto}]
      },
      { 
        method: "put",
        route: "/api/purchase/:id",
        controller: PurchaseController,
        action: "update",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: PurchaseDto}]
      },
      { 
        method: "delete",
        route: "/api/purchase/:id",
        controller: PurchaseController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      },
]