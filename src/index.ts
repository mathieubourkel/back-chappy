import express from "express";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/";


// DEMARRAGE EXPRESS ET REDIS
const app = express();

// PRE-MIDDLEWARES
const routeClass = new Routes()
routeClass.applyGlobalMiddleware(app);



AppDataSource.initialize()
  .then(async () => {
    routeClass.routes.forEach((_route) => {
      const { method, route, action, controller } = _route;
      (app as any)[method](
        route,
        async (req: Request, res: Response, next: NextFunction) => {
         // await applyMiddleware(req, res, next, _route)
        },
        async (req: Request, res: Response, next: NextFunction ) => {
          new (controller as any)()[action](req, res, next);
        },
      );
    })
    //ERROR Middleware
    routeClass.applyGlobalErrorMiddleware(app)
  })
  .catch((error) => console.log(error));

// CONF ECOUTE
app.listen(process.env.VITE_BACK_PORT);
console.log(
  `${process.env.NODE_ENV} : Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`
);
