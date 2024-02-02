import { CustomError } from "../middlewares/error.handler.middleware";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { corsOptions } from "../utils/cors.options.utils";
import { RoutesInterface } from "../interfaces/route.interface";
import { AuthRoutes } from "./auth.routes";
import { StepRoutes } from "./step.routes";
import { ProjectRoutes } from "./project.routes";
import { TaskRoutes } from "./task.routes";
import { CommentRoutes } from "./comment.routes";
import { DocumentRoutes } from "./document.routes";
import { NotificationRoutes } from "./notification.routes";
import { PurchaseRoutes } from "./purchase.routes";

export class Routes {

    routes: RoutesInterface;

    constructor() {
        this.routes = [
            ...AuthRoutes,
            ...CommentRoutes,
            ...DocumentRoutes,
            ...NotificationRoutes,
            ...ProjectRoutes,
            ...StepRoutes,
            ...PurchaseRoutes,
            ...TaskRoutes,
        ]
    }

    applyGlobalMiddleware(app) {
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(cors(corsOptions));
    }

    async applyGlobalErrorMiddleware(app) {
        app.use(() => {
            throw new CustomError("IDX-NOMATCH", 404)
        })
        app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
            if (!(err instanceof CustomError)) err = new CustomError("UNEXPECTED", 500)
            err.sendError(res)
        });
    }
}
