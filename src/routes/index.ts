import { CustomError } from "../middlewares/error.handler.middleware";
import { userRoute } from "./user.route";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { corsOptions } from "./../enums/utils/cors.options.enum";

export class Routes {

    routes: any[];

    constructor() {
        this.routes = [...userRoute]
    }

    applyGlobalMiddleware(app) {
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(cors(corsOptions));
        app.use('api/user',)
    }

    applyGlobalErrorMiddleware(app) {
        app.use(() => {
            throw new CustomError("IDX-NOMATCH", 404)
        })
        app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
            if (!(err instanceof CustomError)) err = new CustomError("UNEXPECTED", 500)
            err.sendError(res)
        });
    }
}

