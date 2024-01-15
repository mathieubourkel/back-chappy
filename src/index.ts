import express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import {createClient} from "redis";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middlewares/ErrorHandler";
import { CustomError } from "./utils/CustomError";
import cookieParser from "cookie-parser";
import { Routes } from "./routes";
import { verifyRefresh, verifyToken } from "./middlewares/tokens.middleware";
import { corsOptions } from "./config/cors.middleware";
import { fetchDataFromRedis } from "./middlewares/redis.middleware";

const app = express();

// REDIS
export const redis = createClient({url: process.env.REDIS_URL});
redis.on("connect", function () {
  console.log("Connected");
});
redis.on("error", (err) => {
  console.log(err);
});
(async () => {
  await redis.connect();
})();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", verifyToken);
app.use("/auth/refreshToken", verifyRefresh);
// Tu ajoutes un projet ca ne met pas a jour le cache
app.get('/api/*', fetchDataFromRedis)
AppDataSource.initialize()
  .then(async () => {
    Routes.forEach((_route) => {
      const { method, route, action, controller } = _route;
      (app as any)[method](
        route,
        (req: Request, res: Response, next: NextFunction) => {
          const result = new (controller as any)()[action](req, res, next);
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });
    // middleware gestion des erreurs
    app.use((err: CustomError, req: Request, res: Response, next: Function) => {
      errorHandler(err, res);
    });
  })
  .catch((error) => console.log(error));
console.log(process.env.DB_NAME_DEV)
switch (process.env.NODE_ENV) {
  case "production":
    app.listen(process.env.APP_PORT);
    console.log(
      `[PROD] Server Up on this URL : ${process.env.BACK_HOST}:${process.env.APP_PORT}`
    );
    break;
  case "development":
    app.listen(process.env.APP_PORT_DEV);
    console.log(
      `[DEV] Server Up on this URL : ${process.env.BACK_HOST_DEV}:${process.env.APP_PORT_DEV}`
    );
    break;
  default:
    console.log("Configure ton .env amig[o,a]");
}
