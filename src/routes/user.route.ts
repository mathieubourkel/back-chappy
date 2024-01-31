import { UserController } from "../controllers/user.controller";
import { CreateUserDto } from "../dto/user.dto";



export const userRoute = [
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
       
    },
    {
        method: "delete",
        route: "/api/user/:id",
        controller: UserController,
        action: "delete"
    },
]