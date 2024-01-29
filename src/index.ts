import express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { errorHandlerMiddleware } from "./middlewares/error.handler.middleware";
import { CustomError } from "./utils/CustomError";
import cookieParser from "cookie-parser";
import { Routes } from "./routes";
import { verifyRefreshMiddleware, verifyTokenMiddleware } from "./middlewares/tokens.middleware";
import { createClient } from "redis";
import { AppDataSource } from "./data-source";
import { verifyDtoMiddleware } from "./middlewares/dto.middleware";
import { HTTPMessages } from "./utils/HTTPMessages";
import { corsOptions } from "./utils/CorsOptions";

// DEMARRAGE EXPRESS ET REDIS
const app = express();
export const redis = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
(async () => {
    await redis.connect();
})();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api", verifyTokenMiddleware);
app.use("/auth/refreshToken", verifyRefreshMiddleware);

AppDataSource.initialize()
  .then(async () => {
    Routes.forEach((_route) => {
      const { method, route, action, controller, dto } = _route;
      (app as any)[method](
        route,

        async (req: Request, res: Response, next: NextFunction ) => {
          verifyDtoMiddleware(req, res, next, dto)
        },

        async (req: Request, res: Response, next: NextFunction ) => {
          new (controller as any)()[action](req, res, next);
        },

        async (err: CustomError, res:Response) => {
          errorHandlerMiddleware(err, res)
        }
      );
    })
    app.use((req, res) => {
      res.status(404).json(HTTPMessages[404]);
    });
  })
  .catch((error) => console.log(error));

// CONF ECOUTE
app.listen(process.env.VITE_BACK_PORT);
console.log(
  `${process.env.NODE_ENV} : Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`
);
