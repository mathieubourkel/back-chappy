import { NotificationController } from "../controllers/notification.controller";
import { CreateNotificationDto } from "../dto/notification.dto";

export const NotificationRoutes = [
    { 
        method: "get",
        route: "/api/notifications/:idUser",
        controller: NotificationController,
        action: "getNotificationsByUser",
        middlewares: [{name: 'checkToken'}]
      },
      { 
        method: "post",
        route: "/api/notification",
        controller: NotificationController,
        action: "create",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: CreateNotificationDto}]
      },
      { 
        method: "delete",
        route: "/api/notification/:id",
        controller: NotificationController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      },
]