import express from "express";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/";
import { applyMiddlewares } from "./middlewares/manage.middlewares";
import { createClient } from "redis";

const app = express();
const routeClass = new Routes()
routeClass.applyGlobalMiddleware(app);

export const redis = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
(async () => {
    await redis.connect();
})();

AppDataSource.initialize()
  .then(async () => {
    routeClass.routes.forEach((objRoute) => {
      const { method, route, action, controller} = objRoute;
      (app as any)[method](
        route,

        async (req: Request, res: Response, next: NextFunction ) => {
          await applyMiddlewares(req, res, next, objRoute)
        },

        async (req: Request, res: Response, next: NextFunction ) => {
          new (controller as any)()[action](req, res, next);
        },

      );
    })
    await routeClass.applyGlobalErrorMiddleware(app)
  })
  .catch((error) => console.log(error));

// CONF ECOUTE
app.listen(process.env.VITE_BACK_PORT);
console.log(
  `${process.env.NODE_ENV} : Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`
);
