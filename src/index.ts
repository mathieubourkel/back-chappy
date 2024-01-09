import express from "express";
import { Routes } from "./routes";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middlewares/ErrorHandler";
import { CustomError } from "./utils/CustomError";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { verifyRefresh, verifyToken } from "./middlewares/tokens.middleware";

const corsOptions = {
  origin: process.env.FRONT_URL,
  methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH,HEAD',
  credentials: true,
  allowedHeaders: 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api", (req, res, next) => verifyToken(req, res, next))
app.use("/auth/refreshToken", (req, res, next) => verifyRefresh(req, res, next))

AppDataSource.initialize()
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
console.log("Server is up !");
