import { NotificationController } from "../controllers/notification.controller";
import { CreateNotificationDto, NotificationDto } from "../dto/notification.dto";

export const NotificationRoutes = [
    { 
        method: "get",
        route: "/api/notifications",
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
        method: "put",
        route: "/api/notification/:id",
        controller: NotificationController,
        action: "update",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: NotificationDto}
      ]
    },
      { 
        method: "delete",
        route: "/api/notification/:id",
        controller: NotificationController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      },
]