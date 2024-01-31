import { CategoryController } from "../controllers/category.controller";
import { CreateCategoryDto } from "../dto/category.dto";

export const CategoryRoutes = [
    { 
        method: "get",
        route: "/api/categories",
        controller: CategoryController,
        action: "getAll",
        middlewares: [{name: 'checkToken'}]
      },
      { 
        method: "post",
        route: "/api/category",
        controller: CategoryController,
        action: "create",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: CreateCategoryDto}]
      },
      { 
        method: "delete",
        route: "/api/category/:id",
        controller: CategoryController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      },
]