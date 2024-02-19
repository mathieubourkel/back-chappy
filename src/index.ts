import express, { request, response } from "express";
import { Request, Response, NextFunction } from "express";
import { dataBaseSource } from "./data-source";
import { Routes } from "./routes/";
import { applyMiddlewares } from "./middlewares/manage.middlewares";
import { verifyDtoMiddleware } from "./middlewares/dto.middleware";
import bodyParser from "body-parser";
import { CustomError } from "./middlewares/error.handler.middleware";

const app = express();
const routeClass = new Routes()
// function qui applique le middleware global
// routeClass.applyGlobalMiddleware(app);
app.use(bodyParser.json());

// initialise la connection a la source de donnée
dataBaseSource.AppDataSource.initialize()
  // logique exécuté après l'initialisation ade la source de donnée
  .then(async () => {
    // cette ligne itère a travers chaque objet de routes dans l'attribut "routes" de l'objet "routeClass"
    routeClass.routes.forEach((route) => {
      // console.log("route", route); 
      (app as any)[route.method](route.route, (req: Request, res : Response, next : Function)=>{
          // console.log("appel de la route",route);
          
          //app[get](/test, () =>{})
          const result = ( new (route.controller as any))[route.action](req,res,next)
          //result = new TestController[test]
          // result = new TestCntroller.test
  
          if(result instanceof Promise){
              console.log("prommises this time");
              
              result.then( 
                  result => result !== null && result !== undefined ? res.send(result): undefined
              )
          }else if(result !== null && result !== undefined){
              res.json(result)
          }
  
      })
    })
  })
  .catch((error) => console.log("Unable to start DB", error));

  // Middleware de gestion d'erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    // Si l'erreur est une instance de CustomError, utilisez sa méthode sendError pour envoyer la réponse d'erreur
    err.sendError(res);
  } else {
    // Si ce n'est pas une instance de CustomError, logguez l'erreur et renvoyez une réponse d'erreur générique
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
});

app.listen(process.env.VITE_BACK_PORT);
console.log(`Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`)
