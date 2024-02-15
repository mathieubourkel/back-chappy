import express from "express";
import https from "https";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/";
import { applyMiddlewares } from "./middlewares/manage.middlewares";
import fs from "fs";
import path from "path";

const app = express();

const routeClass = new Routes();
routeClass.applyGlobalMiddleware(app);

AppDataSource.initialize()
  .then(async () => {
    routeClass.routes.forEach((objRoute) => {
      const { method, route, action, controller } = objRoute;
      (app as any)[method](
        route,

        async (req: Request, res: Response, next: NextFunction) => {
          await applyMiddlewares(req, res, next, objRoute);
        },

        async (req: Request, res: Response, next: NextFunction) => {
          new (controller as any)()[action](req, res, next);
        }
      );
    });
    await routeClass.applyGlobalErrorMiddleware(app);
  })
  .catch((error) => console.log("Unable to start DB", error));

if (process.env.NODE_ENV === "production") {
  const privateKeyPath = path.join(__dirname, 'privkey.pem');
  const certPath = path.join(__dirname, 'cert.pem');

  const options = {
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(certPath),
  };
  
  const server = https.createServer(options, app);
  server.listen(process.env.VITE_BACK_PORT, () => {
    console.log(
      `${process.env.NODE_ENV} : HTTPS Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`
    );
  });
} else {
  app.listen(process.env.VITE_BACK_PORT, () => {
    console.log(
      `${process.env.NODE_ENV} : Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`
    );
  });
}
