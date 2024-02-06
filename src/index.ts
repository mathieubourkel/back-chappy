import express from "express";
import { Request, Response, NextFunction } from "express";
import { dataBaseSource } from "./data-source";
import { Routes } from "./routes/";
import { applyMiddlewares } from "./middlewares/manage.middlewares";

const app = express();
const routeClass = new Routes()
// function qui applique le middleware global
routeClass.applyGlobalMiddleware(app);

// initialise la connection a la source de donnée
dataBaseSource.AppDataSource.initialize()
  // logique exécuté après l'initialisation ade la source de donnée
  .then(async () => {
    // cette ligne itère a travers chaque objet de routes dans l'attribut "routes" de l'objet "routeClass"
    routeClass.routes.forEach((objRoute) => {
      // constante qui extrait les propriété de chaque ojtRoute. Ces propriétés définissent la methode utilisé, le chemin de la route, l'action à effectuer et le controleur à utiliser
      const { method, route, action, controller} = objRoute;
      // configure une route en utilisant la methode et la route spécifié, tout en contournant les vérifications de typescript any
      (app as any)[method](
        route,

        // fonction asynchrone qui prend 3 paramètres et leur typage défini dans Express
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

app.listen(process.env.VITE_BACK_PORT);
console.log(`Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`);
