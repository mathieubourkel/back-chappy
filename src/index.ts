import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { createClient } from "redis";
import { Routes } from "./routes";
import { AppDataSource } from "./data-source";
import { CustomError } from "./middlewares/error.handler.middleware";
import { verifyDtoMiddleware } from "./middlewares/dto.middleware";
import { verifyRefreshMiddleware, verifyTokenMiddleware } from "./middlewares/tokens.middleware";
import { corsOptions } from "./enums/utils/cors.options.enum";


// DEMARRAGE EXPRESS ET REDIS
const app = express();
export const redis = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
(async () => {
    await redis.connect();
})();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", verifyTokenMiddleware);
app.use("/auth/refreshToken", verifyRefreshMiddleware);

AppDataSource.initialize()
  .then(async () => {
    Routes.forEach((_route) => {
      const { method, route, action, controller, dto } = _route;
      (app as any)[method](
        route,

        async (req: Request, res: Response, next: NextFunction ) => {
          await verifyDtoMiddleware(req, res, next, dto)
        },

        async (req: Request, res: Response, next: NextFunction ) => {
          new (controller as any)()[action](req, res, next);
        },
      );
    })
    app.use(() => {
      throw new CustomError("IDX-NOMATCH", 404)
    })
    app.use((err:CustomError, req: Request, res:Response, next:NextFunction) => {
      if (!(err instanceof CustomError)) err = new CustomError("UNEXPECTED", 500)
      err.sendError(res)
    });
  })
  .catch((error) => console.log(error));

// CONF ECOUTE
app.listen(process.env.VITE_BACK_PORT);
console.log(
  `${process.env.NODE_ENV} : Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`
);
