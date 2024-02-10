import express from "express";
import https from "https";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/";
import { applyMiddlewares } from "./middlewares/manage.middlewares";
import fs from "fs"

const app = express();
const options = {
  key: fs.readFileSync(`${__dirname}/express.pem`),
  cert: fs.readFileSync(`${__dirname}/express.cert`),
};

const server = https.createServer(options, app);
const routeClass = new Routes()
routeClass.applyGlobalMiddleware(app);

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
  .catch((error) => console.log("Unable to start DB", error));

server.listen(process.env.VITE_BACK_PORT, () => {
  console.log(`${process.env.NODE_ENV} : Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`);
});
