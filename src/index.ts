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
    routeClass.routes.forEach((route) => {
      console.log("route", route); 
      (app as any)[route.method](route.route, (req: Request, res : Response, next : Function)=>{
          console.log("appel de la route",route);
          
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

app.listen(process.env.VITE_BACK_PORT);
console.log(`Server Up on this URL : ${process.env.VITE_PROTOCOL}://${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`)
