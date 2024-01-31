import { NextFunction, Request, Response } from "express";
import { HTTPMessagesEnum } from "../enums/utils/http.messages.enum";
import { CustomError } from "../middlewares/error.handler.middleware";
import { CacheUtils } from "../utils/cache.utils";

export abstract class GlobalController extends CacheUtils{
  // Fonction globale, utilisée dans toutes les fonctions de controlleurs
  // elle engloba la gestion du try/catch 
  // ainsi que celle des erreurs
  // En cas de catch on a (next) qui appelle le middleware de gestion d'erreurs

  protected async handleGlobal<T>(req: Request,res: Response,
    next: NextFunction,
    callback: () => Promise<T>,
    // status facultatif si on veut mettre un status perssonalisé (201)
    status?: number
  ) {
    try {
      // le callback sera toutes les fonctions enfant des controlleurs
      // On stock le resultat
      // Si la promesse a échouée dans la fonction enfant, cela échoue
      // également dans cette fonction et renvoie le catch qui renvoie vers
      // la gestion d'erreurs
      let result = await callback();
      res.status(status || 200)
        .json({
          data: result,
          date: new Date().toLocaleString('fr-FR', {timeZone: process.env.TZ}),
          // Si il y a un status présent met le, sinon affiche une 200
          // (en cas de création avec un 201 par exemple)
          message: Object.values(result).length == 0 ? "No data" : HTTPMessagesEnum[status || 200],
        });
    } catch (error) {
      next(error);
    }
  }
}
