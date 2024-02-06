import { NextFunction, Request, Response } from "express";
import { RouteInterface } from "../interfaces/route.interface";
import { verifyDtoMiddleware } from "./dto.middleware";
import { verifyRefreshMiddleware, verifyTokenMiddleware } from "./tokens.middleware";
import { MiddlewaresEnum } from "../enums/middlewares.enum";

export async function applyMiddlewares(req: Request,res: Response,next: NextFunction,route: RouteInterface) {

  // vérifie si la route a des middleware définis, si aucun middleware on passe a la suite du code
  if (!route.middlewares) next();
  try {
    // boucle qui itère a travers chaque middleware défini pourla route en cours de traitement
    for (const mdw of route.middlewares){
      // examine le nom de chaque middleware et exécute celui qui correspond
      switch (mdw.name) {
        case MiddlewaresEnum.TOKEN:
          // functio qui vérifie l'existance du token
            await verifyTokenMiddleware(req, res, next)
            break;
        case MiddlewaresEnum.DTO:
            await verifyDtoMiddleware(req, res, next, mdw.classDto)
            break;
        case MiddlewaresEnum.REFRESH_TOKEN:
            await verifyRefreshMiddleware(req, res, next)
            break;
        default:
            console.log("Names your middlewares better")
      } 
    }
    next()
  } catch (error) {
    next(error)
  }
}
