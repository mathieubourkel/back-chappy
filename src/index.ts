import express from "express";
import { Routes } from "./routes";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { dataBaseSource } from "./data-source";
import { errorHandler } from "./middlewares/ErrorHandler";
import { CustomError } from "./utils/CustomError";
import cors from 'cors';
import { tokensMiddleware } from "./middlewares/tokens.middleware";

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use("/api", (req, res, next) => tokensMiddleware(req, res, next))
app.use("/auth/refreshToken", (req, res, next) => tokensMiddleware(req, res, next, true))

if (process.env.NODE_ENV === "production") dataBaseSource.AppDataSource.initialize()
if (process.env.NODE_ENV === "development") dataBaseSource.AppDataSourceDev.initialize()
  .then(async () => {
    Routes.forEach((_route) => {
      const { method, route, action, controller } = _route;
      (app as any)[method](
        route,
        (req: Request, res: Response, next: Function) => {
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
process.env.NODE_ENV === 'production' ? app.listen(process.env.APP_PORT) : app.listen(process.env.APP_PORT_DEV)
console.log("express runing");
