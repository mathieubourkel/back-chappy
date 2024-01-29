import express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorHandler";
import { CustomError } from "./utils/CustomError";
import cookieParser from "cookie-parser";
import { Routes } from "./routes";
import { verifyRefresh, verifyToken } from "./middlewares/tokens.middleware";
import { corsOptions } from "./middlewares/cors.middleware";
import { createClient } from "redis";
import { AppDataSource } from "./data-source";

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
app.use("/api", verifyToken);
app.use("/auth/refreshToken", verifyRefresh);

// ROUTES AVEC TYPEORM
AppDataSource.initialize()
  .then(async () => {
    Routes.forEach((_route) => {
      const { method, route, action, controller } = _route;
      (app as any)[method](
        route,
        (req: Request, res: Response, next: NextFunction) => {
          new (controller as any)()[action](req, res, next);
        }
      );
    });
    // middleware gestion des erreurs
    app.use((err: CustomError, req: Request, res: Response, next: Function) => {
      errorHandler(err, res);
    });
  })
  .catch((error) => console.log(error));

// CONF ECOUTE
app.listen(process.env.VITE_BACK_PORT);
console.log(
  `${process.env.NODE_ENV} : Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`
);
